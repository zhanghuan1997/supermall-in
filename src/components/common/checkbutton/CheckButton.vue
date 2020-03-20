<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/tick.svg" alt="">
  </div>
</template>

<script>
  export default{
    components:{},
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check{
    border-color: red;
    background-color: red;
  }
</style>
