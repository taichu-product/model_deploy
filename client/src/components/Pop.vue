<template>
    <div class="cover" v-show="message.show" @click="popMsg">
        <div class="popImg"><img :src=message.errorImg alt=""></div>
        <div class="popText">{{message.errorMsg}}</div>
        <span>X</span>
    </div>
</template>

<script>    
export default {
    name: 'App',
    props:['message'],
    methods:{
        popMsg(){
            this.message.show = false;
        } 
    }
}
</script>

<style lang="less">
.cover{
    width: 50vw;
    height: 40vw;
    border-radius: 5rem;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 99;
    position: fixed;
    top: 20rem;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    .popImg{
        width: 40%;
        display: inline-block;
        img{
            width:100%;
        }
    }
    .popText{
        color: #fff;
        padding: 0 15%;
        font-size: 1.5rem;
        text-align: left;
    }  
    span{
        color: #fff;
        position: absolute;
        top: 2rem;
        right: 2rem;
        width: 4rem;
        height: 4rem;
        font-size: 2rem;
        background-color: rgba(0,0,0,1);
        border-radius: 2rem;
        line-height: 4rem;
    }
}
</style>