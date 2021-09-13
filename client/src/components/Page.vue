<template>
    <div class="content">
        <div class="list">
            <ul>
                <li v-for = "(item,index) in aiList" @click="toCase(index)" :key="index">
                    <div class="ai-img"><img :src=item.img alt=""></div>
                    <div class="ai-name">
                        <p>{{item.name}}</p>
                        <p>{{item.des}}</p>
                    </div>
                </li>
            </ul>
        </div>
     <div id="goTopBtn" @click="goTop" ref="btn"></div>
    </div>
</template>

<script>   
import common from '../assets/js/common'; 
export default {
    name: 'Page',
    props:['message'],
    data () {
        return {
            aiList: [
                {
                    name: 'Name',
                    des: 'I am the case 1',
                    img: require('../assets/img/robot.jpg')
                }
            ]
        }
    },
    methods:{
        toCase(index) {
            let address = '/case' + (index+1);
            this.$router.push({ path: address})
        },
        goTop () {
            $('html,body').animate({'scrollTop':0},1000);
        }
    }
}
</script>

<style lang="less">
@color-orange:#e97a08;

// PC
@media screen and (min-width:765px) {
    html{
        font-size: 10px;
        font-family:Georgia, 'Times New Roman', Times, serif;
    }
    .content {
        max-width:765px;
    }
}
@media screen and (min-width:320px) and (max-width:765px){

}
.content{
    width: 100%;
    height: 100vh;
    margin:0 auto; 
    background-color: @color-orange;  
}

.list {
    width: 100%;
    height: 85vh;
    background-color: #fff;
    ul {
        li {
            padding: 2rem;
            height: 10rem;
            display: flex;
            text-align: left;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            .ai-img{
                width: 10rem;
                height: 10rem;
                border-radius: 2rem;
                overflow: hidden;
                img {
                    width: 100%;
                }
            }
            .ai-name {
                padding-left: 2rem;
                padding-top: 2rem;
                p:first-child {
                    font-size: 2.4rem;  
                }
                p:last-child {
                    font-size: 2rem;  
                }
            }
        }
    }
}
#goTopBtn {
    position: fixed;
    z-index: 999;
    width:2rem;
    bottom:4rem;
    height:2rem;
    right:2rem;
    cursor:pointer;
    display:none;
    background-image: url(../assets/img/arrow-up.png);
    background-size: 100% 100%;
}
</style>