# TorchServe所需代码编写
使用TorchServe提供模型推理服务需要对模型结构和代码做一些处理，本章是对代码编写部分的总结。

### 主程序入口
创建打包.mar文件需要添加`--handler my_handler.py`处理。
`my_handler.py`是自己编写的文件，定义模型导入、前处理、推理、后处理等。
handler文件可以使用torchServe下默认的handler文件；也可以定义一个接受data和context参数的全局函数，该全局函数充当执行的入口点，并返回预测结果
以下是`my_handler.py`代码示例。
```python
from MyHandler import MyHandler

_service = MyHandler()

def handle(data, context):
  if not _service.initialized:
    _service.initialized(context)

  if data is None:
    return None
  
  data = _service.preprocess(data)
  data = _service.inference(data)
  data = _service.postprocess(data)

  return data
```

### Handlers编写
Handlers处理程序负责使用模型对一个或多个HTTP请求进行预测。
Torchserve支持以下默认 handlers：
```txt
image_classifier
object_detector
text_classifier
image_segmenter
```

一个Handler是一个必须有三个函数的类：`preprocess`，`inference`和`postprocess`。
可以创建自己的类或者子类`BaseHandler`。子类化`BaseHandler`的主要优点是可以在`self.model`上访问加载的模型。子类化`BaseHandler`参考代码如下：
```python
import logging
import torch
import torch.nn.functional as F
import PIL as Image
form ts.torch_handler.base_handler import BaseHandler

class MyHandler(BaseHandler):
  def __init__(self, *args, **kwargs):
    super().__init__()
    # 自定义方法 
    self._context = None
    self.initialized = False
    self.explain = False
    self.target = 0

  def initialize(self, context):
    self._context = context
    self.initialized = True
    # 使用GPU进行推理
    self.device = torch.device("cuda:" + str(properties.get("gpu_id")) if torch.cuda.is_available() else "cpu")

  # 单张图片预处理
  def preprocess_one_image(self, req):
    # 从请求的data或body字段访问序列化的图像
    req.get("data")
        if image is None:
          image = req.get("body")
          # do sth
        return image   

  def preprocess(self, requests):
    images = [self.preprocess_one_image(req) for req in requests]
    # 对每个请求中的每个图像进行预处理之后，连接起来创建一个pytorch张量
    images = torch.cat(images)
    return images

  def inference(self, x):
    outs = self.model.forward(x)
    probs = F.softmax(outs, dim=1)
    preds = torch.argmax(probs, dim=1)
    return preds

  def postprocess(self, preds):
    res = []
    preds = preds.cpu().tolist()
    for pred in preds:
      label = self.mapping[str(pred)][1]
      res.append({'label': label, 'index': index})
    return res
```
Torchserve总是返回一个数组，`BaseHandler`也会自动打开一个json文件带有`index -> label`的映射，并将其存储`self.mapping`中。我们可以为每个预测返回一个字典数组，其中包含`label`和`index`的类别。
`initialize`函数在Torchserve加载模型时调用，可以在这个函数中选择GPU作为推理处理器。


### 模型保存
目前支持的有两种格式文件，一种是`torch.save`直接保存的模型（这里又包括保存同时模型和权重和只保存权重两种），另外一种就是转换为`torchscript`格式的模型。
eagermodel由于缺少模型的定义，只有权重或只有权重和模型路径，所以还需要模型定义文件，在执行打包时需要带参数`--models-files`。
eagermodel对应的模型保存方法如下：
```bash
# 保存整个模型
torch.save(model,'save.pt')
# 只保存训练好的权重
torch.save(model.state_dict(), 'save.pt')
```
将模型转换为torchscript的格式。模型转化方法如下：
```pytorch
traced_script_module = torch.jit.trace(model, input)
traced_script_module.save('./script_model.pth')
```

附录：
(pytorch部署模型)[https://blog.51cto.com/u_15279692/2941283]
(TorchServe部署Yolov5翻车录)[https://jishuin.proginn.com/p/763bfbd385b8]

