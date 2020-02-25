<template>
  <div class="goodslist">
    <goods-list-item v-for="item in goods" :goodsItem="item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'
  export default{
    components:{
      GoodsListItem
    },
    props:{
      goods:Array
    }
  }
</script>

<style>
  .goodslist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>
