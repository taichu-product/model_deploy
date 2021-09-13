<template>
    <div class="content">
        <div class="room">
            <!-- 返回上一级目录 -->
            <div class="back" @click="onBack"><img src="../assets/img/arrow-left.png" alt=""></div>
            
            <div class="chat">
                <!-- 聊天记录 -->
                <div class="chat-history" ref="messagesContainer">
                    <ul>
                        <li v-for = "(item,index) in chatList" class="cleafix">
                            <div class="bot" v-show="index % 2 == 0 && item != ''">
                                <div class="sentence"><span>{{item}}</span></div>
                                <div class="time"><span></span></div>
                            </div>
                            <div class="people" v-show="index % 2 != 0 && item != ''">
                                <div class="sentence"><span>{{item}}</span></div>
                                <div class="time"><span></span></div>
                            </div>
                        </li>
                      </ul>
                </div>
                <!-- 用户输入 -->
                <div class="user-input">
                    <form>
                        <div class="text"><input class="textarea" placeholder="" v-model="input" placeholder="Your message..."></input></div> 
                        <button class="button" id="start" type="submit" @click="submit" v-on:keyup.enter="submit">
                            <img src="../assets/img/icon_sent.png" alt="">
                        </button>
                    </form>
                </div>
            </div>      
        </div> 
        <pop v-bind:message="tip"></pop>     
    </div>
</template>

<script>
import axios from 'axios';
import common from '../assets/js/common';
import pop from '../components/Pop';

let host = common.getHost();
let reqPath = 'http://******/api/userspeak2';

export default {
  name: 'Case1',
  components:{
      pop
    },
  data () {
    return {
        input:'',
        tip:{
            show:false,    
            errorImg:require('../assets/img/cry.png'),
            errorMsg:'这都是个啥鬼问题？？？', 
        },
        show: true,
        chatList:[],
        cnt:0
    }
  },
  methods: {
    onBack () {
        this.$router.push({ path: '/' })
    },
    submit (event) {
        event.preventDefault();
        if(this.input != '')
            this.chatList.push(this.input);
        else 
            return;
        let self = this;
        let form = new FormData();
        let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
        form.append('txt',this.input );
        // 发送请求
        axios.post(reqPath,form,config).then((res) => {
            console.log('start to chats!');
            let data = res.data;
            if(data.code == 0){
                this.chatList.push(data.data.resdata);
                this.input = '';
            }else{
                self.tip.show = true;
                self.show = true;
            }
            this.messagesContainerTimer = setTimeout(()=>{
                this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
                clearTimeout(this.messagesContainerTimer);
            },0);
            this.cnt = 0;
        }).catch((error) => {
            this.cnt += 1;
            this.chatList.push('');
            console.error(error);
            if(this.cnt >= 3) {
                self.tip.errorMsg = '服务器开小差了哦～'
                self.tip.show = true;
                self.show = true;
            }
            this.messagesContainerTimer = setTimeout(()=>{
            this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
            clearTimeout(this.messagesContainerTimer);
        },0);
        }); 
    } 
  },
  created() {
      
  }
}
</script>

<style lang="less" scoped>
@color-green:#8dc43a;
@color-green-bg:#2EA263;
@color-green-dark:#278C53;
@color-orange:#E4B05C;
@color-green-s:#E8F3EF;

@color-grey-s:#F7F7F7;

@color-orange:#feb100;
@color-grey-d:#44453f;
@color-grey:#6a6b66;


.border(@width: 0.5rem,@radius:3rem,@color:#000) {
    border: @width solid @color;
    border-radius: @radius;
}
html,body{
    margin: 0;
    padding:0;
    width: 100%;
    max-width: 100%;
    /* min-height: 100%; */
}
// PC
@media screen and (min-width:765px) {
    html{
        font-size: 10px;
        font-family:Georgia, 'Times New Roman', Times, serif;
        background-color:@color-green-bg;
    }
    .content {
        max-width:765px;
        text-align: center;
    }
    .chat-history {
        width: 90%;
        overflow-y: scroll;
    }
    .user-input {
        bottom: 0;
    }
}
@media screen and (min-width:320px) and (max-width:765px){
    .chat-history {
        width: 90vw;
    }
    .user-input {
        bottom: 1rem;
    }
}
.content{
    width: 100%;
    height: 100vh;
    margin:0 auto;   
}
.back {
    position: absolute;
    left: 1rem;
    top: 1rem;
    width: 3rem;
    cursor: pointer;
    z-index: 99;
    img {
        width: 100%;
    }
}
.room{
    width: 100%;
    height: 100%;
    position: relative;
}
.chat {
    position: relative;
    width: 100%;
    height: calc(100% - 15rem);
    background-color: #fff;
    border-top-left-radius:3rem;
    border-top-right-radius:3rem;
}
.chat-history {
    height: calc(100% - 20rem);  
    margin: 0 auto;
    font-size: 1.6rem;
    display: inline-block;
    text-align:left;
    .bot, .people {
        margin-top: 3rem;
        padding: 1rem;
        border-radius: 1rem;
        display: inline-block;
        span {
            line-height: 3rem;
        }
    }
    .bot{
        max-width: 70vw;
        background-color: @color-orange;
        color:#fff;
        border-bottom-left-radius: 0;
    }
    .people{
        max-width: 70vw;
        background-color: @color-grey-d;
        color:#fff;
        float:right;
        border-bottom-right-radius: 0;
    }
    .cleafix:after{
        content:'.';
        display: block;
        clear: both;
        overflow: hidden;
        height: 0;
    }
}
.chat-history {
    overflow: scroll;
    -ms-overflow-style: none;
}
.chat-history::-webkit-scrollbar { 
    width: 0 !important 
}
.user-input {
    position: absolute;
    z-index: 99;
    width: 100%;
    background-color: @color-grey-d;
    form{
        padding: 2rem;
    }
    
    .text {
        display: inline-block;
        width:70%;
    }
}
.textarea{
    width: calc(100% - 6rem);
    height: 5rem;
    .border(0.1rem,5rem,@color-grey-s);
    font-size:1.5rem;
    padding:0 3rem;
}
.button {
    width: 4rem;
    height: 5rem;
    /* border-radius: 5rem; */
    vertical-align: top;
    border: 1px solid @color-grey-d;
    /* color:@color-grey; */
    background-color:@color-grey-d ;
    opacity: 0.8;
    margin-left:5vw;
    cursor: pointer;
    img {
        width: 100%;
    }
}
</style>