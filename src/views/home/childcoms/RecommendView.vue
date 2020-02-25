<template>
  <div class="recomend">
    <div v-for="item in childrecommends" class="item-recommend">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      childrecommends:Array
    }
  }
</script>

<style>
  .recomend{
    display: flex;
    text-align: center;
    width: 100%;
    font-size: 12px;
    padding: 10px 0 30px;
    border-bottom: 10px solid #eee;
  }
  .item-recommend{
    flex: 1;
  }
  .item-recommend img{
    width: 70px;
    height: 70px;
  }
</style>
