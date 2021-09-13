# TorchServe使用指南
 TorchServe是用来部署PyTorch模型的，具有可扩展性和易用性的特点。

#### 当前版本
```bash
# 依赖环境
jdk-11.0.12
# 0.2以上版本会出现模型找不到问题
torchserve:0.2.0
```

### TorchServe操作指南
#### 安装测试
从git下载源码
```bash
git clone https://github.com/pytorch/serve.git
cd serve
```

下面以densenet161为样例进行测试。
从pytorch官网下载模型权重并保存到本地目录。
```bash
curl -o /home/guoningyan/model-server/image_classifier/densenet161-8d451a50.pth https://download.pytorch.org/models/densenet161-8d451a50.pth
```

使用`torch-model-archiver`脚本打包模型
```bash
# 安装
pip install torch-model-archiver
# 打包
torch-model-archiver --model-name densenet161 --version 1.0 --model-file /home/guoningyan/model-server/image_classifier/densenet_161/model.py --serialized-file /home/guoningyan/model-server/image_classifier/densenet161-8d451a50.pth --export-path /home/guoningyan/serve/model_store --extra-files /home/guoningyan/model-server/image_classifier/index_to_name.json --handler image_classifier
# 获得densenet161.mar，存放在/home/guoningyan/serve/model_store文件夹下
```
`--model-name`: 模型的名称，后来的接口名称和管理的模型名称都是这个
`--version`：指定模型的版本
`--serialized-file`: pt文件路径
`--export-path`: 导出.mar⽂件的存放路径,如果没有给予此参数,默认在当前⽂件下保存其⽂件名为:模型名(model-name).mar
`--extra-files`: handle.py中需要使用到的依赖文件，如果传递⼀个index_to_name.json⽂件,它将⾃动加载
  到handler,并通过self.mapping访问
`--handler`: 指定handler函数。（模型名:函数名）处理程序负责使用模型对一个或多个HTTP请求进行预测。
`-f`: 覆盖之前导出的同名打包文件


测试运行模型，这里使用`--start`开启服务，服务一直保持后台运行，直到使用`--stop`关闭服务。
```bash
# 加载模型，这里可以加载多个模型
torchserve --start --model-store model_store --models densenet161=densenet161.mar
# 使用图片预测
curl http://127.0.0.1:8080/predictions/densenet161 -T kitten.jpg 
# 停止服务
torchserve --stop 
```

有自定义需求的时候，创建config.propertis文件，启动时使用`--ts-config`引入配置文件。
默认定义：
```txt
inference_address=http://0.0.0.0:8080
management_address=http://0.0.0.0:8081
metrics_address=http://0.0.0.0:8082
number_of_netty_threads=32
job_queue_size=1000
model_store=/home/model-server/model-store
```

### TorchServe + Docker操作指南
#### 安装测试
可选择镜像进行安装，具体镜像选择见附录
```bash
docker pull pytorch/torchserve:latest
```

测试是否安装成功
```bash
docker run --rm -it -p 8080:8080 pytorch/torchserve:latest
# gpu版本
docker run --rm -it -p 8080:8080 pytorch/torchserve:latest-gpu
```

测试运行，如果直接启动模型失败，建议使用带有所有必需参数的docker重新启动。
```bash
# 方法一
# 必须从/home/model-server/model-store中启动模型
docker run --rm -it \ 
-p 8080:8080 -p 8081:8081 \ 
--name densenet161 \ 
-v /home/guoningyan/serve/model_store:/home/model-server/model-store pytorch/torchserve:latest

# 运行带有所有必需参数的torchserve docker容器
docker run --rm -it \
-p 8080:8080 -p 8081:8081 \
-v $(pwd)/model_store:/home/model-server/model-store pytorch/torchserve:latest-gpu \
torchserve --start --model-store model-store --models densenet161=densenet161.mar
# 使用图片预测
curl http://127.0.0.1:8080/predictions/densenet161 -T kitten.jpg 
# 停止服务
docker exec -it [容器名称] /bin/bash
```

模型相关
```bash
# 测试模型状态
curl http://localhost:8081/models/densenet161
# 获取所有注册的模型
curl http://localhost:8081/models
# 查看指标
curl http://127.0.0.1:8082/metrics
```

开发环境使用cuda 10.2版创建基于GPU的图像：（更多环境配置参照附录）
```bash
./build_image.sh -bt dev -g -cv cu102
```

### 参考
#### Q&A
Q：出现“Unable to find image 'pytorch/torchserve:latest-gpu' locally”
Q：出现“Error response from daemon: could not select device driver "" with capabilities: [[gpu]].”
Q：出现“ {
  "code": 404,
  "type": "ModelNotFoundException",
  "message": "Model not found: densenet161"
}”
A：切换torchserve==0.2.0

Q：出现“java.nio.file.Files.readString(Ljava/nio/file/Path;)Ljava/lang/String;”
A：可能是jdk版本问题。
```bash
dpkg --list | grep -i jdk
sudo apt install openjdk-11-jdk
```
Q：出现“Backend worker monitoring thread interrupted or backend worker process died.”
A：模型格式有问题

修改`.bash_profile`，末尾添加
```bash
export JAVA_HOME=/usr/lib/jvm/jdk-11.0.12
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JRE_HOME=$JAVA_HOME/jre
```

#### 问题
端口占用
```bash
lsof -i TCP:8080 | grep LISTEN
netstat -apn | grep 8080
```

附录：
(如何部署 PyTorch 模型)[https://zhuanlan.zhihu.com/p/344364948]
(yolov5_torchserve)[https://github.com/louisoutin/yolov5_torchserve]
(torchserve部署)[https://github.com/pytorch/serve/blob/master/README.md]
(torchserve+docker部署)[https://github.com/pytorch/serve/tree/master/docker]
(torchserve问题解决)[https://github.com/pytorch/serve/blob/master/docs/Troubleshooting.md]
(Linux中普通用户和ROOT用户对Java JDK的配置)[https://blog.csdn.net/mooncom/article/details/52683409]
(Linux下查找JDK默认安装路径)[https://blog.csdn.net/weixin_44853669/article/details/106673161?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0.control&spm=1001.2101.3001.4242]
(torchserve换端口)[https://github.com/pytorch/serve/blob/master/docs/configuration.md]
(handler文件编写指南)[https://zhuanlan.zhihu.com/p/361782496]