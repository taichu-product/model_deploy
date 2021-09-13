# TensorFLow Serving使用指南 
训练完的模型提供给外部使用时，需要把模型部署到线上，并提供合适的接口给外部调用。在交互中使用RestFul API，需要TF>1.8的版本。
本文提供TensorFLow Serving使用指南。

#### 当前版本
```bash
Python Version: 3.7.0 
# nvidia-smi
CUDA Version: 10.2
Docker Version: 19.03.13
```

### TensorFLow Serving + Docker
tensorflow serving和docker容器结合是目前最热门的使用方式，后期可以把环境配置和参数设置打包成新的镜像，便于部署。

#### 安装测试
有多版本的tensorflow serving docker镜像，根据需要可选择GPU版本的镜像。
```bash
docker pull tensorflow/serving
# docker pull tensorflow/serving:1.12.0 可拉取指定版本
git clone https://github.com/tensorflow/serving
```

测试是否安装成功
```bash
# Location of demo models
TESTDATA="$(pwd)/serving/tensorflow_serving/servables/tensorflow/testdata"

# Start TensorFlow Serving container and open the REST API port
docker run -t --rm -p 8501:8501 \
    -v "$TESTDATA/saved_model_half_plus_two_cpu:/models/half_plus_two" \
    -e MODEL_NAME=half_plus_two \
    tensorflow/serving &

# Query the model using the predict API，[1.0, 2.0, 5.0]为模型输入
curl -d '{"instances": [1.0, 2.0, 5.0]}' \
    -X POST http://localhost:8501/v1/models/half_plus_two:predict
# Returns => { "predictions": [2.5, 3.0, 4.5] }
```

查看镜像
```bash
docker images tensorflow/serving
```

运行指定版本的tendorflow
```bash
docker container run -it --runtime=nvidia tensorflow/tensorflow:latest-gpu-py3 bash
```

#### TFS + Docker使用
运行 Docker 容器，将容器的端口发布到主机的端口（8500:gRPC，8501 RestAPI），
并将主机保存模型的路径挂载到到容器需要模型的位置。
```bash
docker run -p 8501:8501 \
  --mount type=bind,source=/path/to/my_model/,target=/models/my_model \
  -e MODEL_NAME=my_model -t tensorflow/serving:latest-gpu
```
-p设置端口映射；-v设置磁盘映射；-v设置磁盘映射；
-t 表示是否允许伪TTY；--rm表示如果实例已经存在，则先remove掉该实例再重新启动新实例；
建立映射时，都是形如“宿主机:docker容器”这种格式。

#### 查看当前运行的TFS容器
```bash
docker ps|grep tensorflow/serving
# 删除容器
docker kill ***
```

### 模型转换
TFserving的模型需要转换成TFserving的格式， 不支持通常的checkpoint和pb格式。其中，pytorch或者MXNet模型，可以通过ONNX转换。
TFserving的模型包含一个.pb文件和variables目录（可以为空）,导出格式如下：
├── 1
│   ├── saved_model.pb
│   └── variables
├── 2
│   ├── saved_model.pb
│   └── variables

不同的深度学习框架的转换路径：
```
(1) pytorch(.pth)--> onnx(.onnx)--> tensorflow(.pb) --> TFserving
(2) keras(.h5)--> tensorflow(.pb) --> TFserving
(3) tensorflow(.pb) --> TFserving
```

### 参考
#### 问题
flask端口占用
```bash
# OSError: [Errno 98] Address already in use
ps -fa | grep python
lsof -i TCP:8800 | grep LISTEN
# 杀死线程
kill -9 ***
```

模型没找到
1. 查路径（目前v100上所有模型都在../../../data/username文件夹下，可共享）
2. tensorflow版本问题

缺少包
```bash
locate ***
# 修改bashrc
vim ~/.bashrc
# 最后一行添加
export LD_LIBRARY_PATH=***:$LD_LIBRARY_PATH
source ~/.bashrc
```

#### 资料
TFServing的特点：
支持模型版本控制和回滚：Manager会进行模型的版本的管理
支持并发，实现高吞吐量
开箱即用，并且可定制化
支持多模型服务
支持批处理
支持热更新：Source加载本地模型，通知Manager有新的模型需要加载，Manager检查模型的版本，通知Source创建的Loader进行加载模型
支持分布式模型

#### 链接
(TF官网)[https://www.tensorflow.org/tfx/serving/docker]
(TFS Docker版本)[https://hub.docker.com/r/tensorflow/serving/tags/?page=1&ordering=last_updated]
(TFS部署DL模型参考)[https://blog.csdn.net/BF02jgtRS00XKtCx/article/details/106247459]
(TFS+Docker教程)[https://zhuanlan.zhihu.com/p/64413178]
(pb模型保存)[https://www.tensorflow.org/guide/saved_model?hl=zh-CN#simple_save]
(TF加载预训练模型和保存模型以及迁移学习finetuning)[https://blog.csdn.net/loveliuzz/article/details/81661875]
(.ckpt、.pb、.pbtxt模型相互转换)[https://blog.csdn.net/weixin_38342946/article/details/105988995]
