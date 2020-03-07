<template>
  <div class="detail">
   <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <!-- 轮播图 -->
      <detail-top-image :topImages="topimages"></detail-top-image>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品图片信息的展示 -->
      <!-- <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info> -->
      <!-- 商品参数信息 -->
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <!-- 商品评论展示 -->
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
    </scroll>
  </div>
</template>

<script>
  //引入的详情页的子组件
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailTopImage from './childComps/DetailTopImage.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  //引入封装的better-scroll
  import Scroll from 'components/common/scroll/Scroll.vue'
  //引入的axios 的模块
  import {getDetail} from 'network/detail.js'
  //引入商品信息展示模块
  import {Goods, Shop, GoodsParam} from 'network/detail.js'
  export default{
    name:'Detail',
    components:{
      DetailNavBar,
      DetailTopImage,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll
    },
    data(){
      return{
        topimages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{}
      }
    },
    methods:{
      getDetail(iid){
        getDetail(iid).then((res)=>{
          this.topimages = res.data.result.itemInfo.topImages
          let data = res.data.result
          //获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          //获取店铺信息
          this.shop = new Shop(data.shopInfo)
          //获取商品信息
          this.detailInfo = data.detailInfo
          //获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          //获取评论信息
          if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
          }
        })
      },
      imageLoad(){
        this.$refs.scroll.refresh()
      }
    },
    created(){
      this.getDetail(this.$route.params.iid)

    }
  }
</script>

<style scoped>
  .detail{
    position: relative;
    z-index: 9;
    background-color: #FFFFFF;
    height: 100vh;
  }
  .detail-nav-bar{
    position: relative;
    z-index: 9;
    background: #FFFFFF;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
