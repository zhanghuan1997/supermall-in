<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
      <MainTabbar/>
  </div>
</template>
<script>
  import MainTabbar from 'components/context/mainTabbar/Maintabbar.vue'
  export default{
    components:{
      MainTabbar
    }
  }
</script>
<style>
@import url("./assets/css/base.css");


</style>
