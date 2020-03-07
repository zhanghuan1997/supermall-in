<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt="" @load="imgLoad">
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
    },
    data(){
      return{

      }
    },
    created(){

    },
    methods:{
      //每一张图片加载完成都会调用这个方法
      imgLoad(){
        //在事件总线上传出去一个imgLoad
        this.$bus.$emit('imgLoad')
      },
      itemClick(){
        this.$router.push('/detail/'+this.goodsItem.iid)
      }
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
