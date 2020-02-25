<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <i class="el-icon-star-off"></i>
      <span>{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    components:{},
    props:{
      goodsItem:Object
    }
  }
</script>

<style>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text) ;
    margin-right: 20px;
  }
  .goods-info i{
    font-size: 14px;
  }
</style>
