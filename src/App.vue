<template>
  <div id="app">
    <router-view></router-view>
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
