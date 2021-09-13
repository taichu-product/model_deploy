<template>
<div class="content" id="app">
	<h1>图片识别</h1>
	<div class="imgRec">
		<form id="upload-form" method="post" enctype="multipart/form-data">
		<div class="upload">
			<h3>选择文件：</h3>
            <input type="file" name="image" id="picture" @change="previewImg" accept="image/png,image/jpeg,image/gif" v-if="!android"/>
            <input type="file" name="image" id="picture" @change="previewImg" accept="image/png,image/jpeg,image/gif" capture="camera" v-if="android"/>
			<div class="preview" id="preview"><img alt="" :src="image_url"></div>
		</div>
		<div class="middle">
			<button class="button" id="start" type="submit" @click="uploadImg" v-bind:disabled="recognizeBtn">{{recognizeText}}</button>
        </div>
		<div class="result">
			<h3>识别结果：</h3>
			<div class="resultText" id="resultText">
                <span>文字信息:</span><span>{{number1}}</span>
            </div>
		</div>
	</form>
    </div>
    <pop v-bind:message="tip"></pop>
</div>
</template>

<script>
import axios from 'axios';
import common from '../assets/js/common';
import pop from '../components/Pop';

let host = common.getHost();
let path,reqPath;
if(host == '内网ip'  || 'http://0.0.0.0:8080'){
    path = 'http://内网ip/';
    reqPath = 'http://内网ip/api/';
}else{
    path = 'http://外网ip/';
    reqPath = 'http://外网ip/api/';
}

export default {
  name: 'Case2',
  components:{
      pop
    },
  data() {
    return {
        tip:{
            show:false,    
            errorImg:require('../assets/img/cry.png'),
            errorMsg:'很抱歉，系统无法识别', 
        },
      image_url: '',
      result: '',
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg',
      },
      recognizeText:'开始识别',
      recognizeBtn:false,
      number1:'',
      show: true,
      android:false
    };
  },
  methods: {
    uploadImg(event){ 
        event.preventDefault();
        console.log('start to upload...'); 
        this.recognizeText = '识别中';
        this.recognizeBtn = true;
        this.number1 = '';
        let reader =new FileReader();
        let img1= document.getElementById('picture').files[0];
        console.log(document.getElementById('picture').files[0])
        let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
        let form = new FormData();
        form.append('file',img1);
        form.append('username', 'ginny');
        axios.post(reqPath+'upload',form,config).then((res) => {
            let data = res.data;
            if(data.code == 0){
                this.image_url = path + data.data.imgoutput;
                this.recognizeText = '开始识别';
                this.recognizeBtn = false;
                let result = data.data.text;
                this.number1 = result.result[1].number1;
            }else{
                this.tip.show = true;
                this.show = true;
                this.recognizeText = '开始识别';
                this.recognizeBtn = false;
            }
        })
        .catch((error) => {
          console.error(error);
        });
        
     },
    previewImg(event){
        console.log('preview....')
        let self = this;
        let currentPic = event.target.files[0];
        let fr = new FileReader();
        fr.readAsDataURL(currentPic);
        fr.onload = function(e){
            self.image_url = this.result;
        };
    }
  },
  created() {
    if (common.isiOS()) { 
    }else if(common.isAndroid()){
        this.android = true;
    }else{
    }
  },
};
</script>

<style lang="less" scoped>
@color-blue:#ABDFE4;

.border(@width: 0.5rem,@radius:3rem) {
    border: @width solid #000;
    border-radius: @radius;
}
html,body{
    margin: 0;
    padding:0;
    width: 100%;
    max-width: 100%;
    min-height: 100%;
}
// PC
@media screen and (min-width:765px) {
    html{
        font-size: 10px;
        font-family:Georgia, 'Times New Roman', Times, serif;
    }
    .imgRec{
        .upload{
            width: 30%;
        }
        .middle{
            width: 19%;
            .button{
                margin-top: 5rem;
            }
        }
        .result{
            width: 30%;
        }
    }
    h3{
        text-align: center;
        font-size: 1.5rem;
    }
}
// mobile
@media screen and (min-width:320px) and (max-width:765px){
    .imgRec{
        .upload{
            width: 100%;
        }
        .middle{
            width: 40%;
            .button{
                margin-top: 1rem;
            }
        }
        .result{
            padding-top:5rem;
            width: 100%;
        }
    }
    h3{
        text-align: center;
        font-size: 3rem; 
    }
}
body{
    position: relative;
    min-height: 100%;
}
h1{
    text-align: center;
    font-size: 5rem;
    margin-top: 5rem;
}
.imgRec{
    background-color: @color-blue;
    margin-top: -2rem;
    padding:5rem 10%;
    div{
        display: inline-block;
        vertical-align: top;
    }
    .middle{
        padding: 0 10%;
        position: relative;
        .button{
            width: 100%;
            padding: 0.5rem;
            background-color: #F9D59D;
            border-radius: 0.5rem;
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
        }
    }
    .taxi{
        width: 100%;
        img{
            width: 100%;
        }
    }
    .upload{
        .preview{
            width: 100%;
            height: 40vw;
            box-sizing: border-box;
            .border;
            overflow: hidden;
            img{
                width: 100%;
                // display: none;
            }
        }
        input[type="file"]{
            line-height: 2rem;
            max-width: 100%;
        }
    }
    .result{
        .resultText{
            width: 100%;
            height: 40vw;
            box-sizing: border-box;
            .border;
            padding: 2rem;
            margin-top: 2rem;
            font-size: 1.4rem;
            ul{
                text-align: left;
                font-size: 1.2rem;
                color: #000;
                li{
                    span:first-child{

                    }
                    span:last-child{
                        padding-left: 0.5rem;
                    }
                }
            }
        }
    }
}

</style>