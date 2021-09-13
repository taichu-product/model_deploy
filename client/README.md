# client

> front-end for tecorigin

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### 当前版本
vue v2.9.6
node v13
npm v6.4.1

目前配置：
`index.js`中注释`//mode:'history'`，url带/#/。

### 打包顺序
1. App.vue中修改版本号
2. 执行a.bash

### 代码样例
router/index.js：修改路径
components/
`Page.vue`：有同种多次渲染，List循环，图片引入，通过url改变页面，返回顶部；
`Case1.vue`：文字交互（适用于NLP），返回上一级目录，聊天滚动框；
`Case2.vue`：图片上传交互（适用于CV），适配Android手机上传；
`Pop.vue`：弹窗（适用于后端返回消息后展示）；

