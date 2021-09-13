<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './assets/js/resize';
export default {
  name: 'App',
  mounted() {
    console.log('This is version 1.0.1'); 
  }
}
</script>

<style lang="less">
@import './assets/reset.less'; 
@import  '../node_modules/animate.css/animate.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  overflow: hidden;
}
body{
  margin:0 !important;
  width: 100%;
}
</style>
