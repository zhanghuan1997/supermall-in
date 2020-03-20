<template>
  <div class="detail">
   <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="themeScroll" :probe-type="3">
      <!-- 轮播图 -->
      <detail-top-image :topImages="topimages"></detail-top-image>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品图片信息的展示 -->
      <!-- <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info> -->
      <!-- 商品参数信息 -->
      <detail-param-info :param-info="paramInfo" ref="paraminfo"></detail-param-info>
      <!-- 商品评论展示 -->
      <detail-comment-info :comment-info="commentInfo" ref="commentinfo"></detail-comment-info>
      <!-- 推荐信息的展示 -->
      <goods-list :goods="recommendInfo" ref="recommendinfo"></goods-list>
    </scroll>
    <!-- 底部工具栏 -->
    <detail-bottom-bar @addShopCar="addShopCar"></detail-bottom-bar>
    <!-- 点击回到顶部 -->
    <back-top @click.native="backTopClick" v-show="backTopShow"></back-top>
    <toast></toast>
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
  import GoodsList from 'components/context/goods/GoodsList.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'
  //引入封装的better-scroll
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/context/backtop/BackTop.vue'
  import Toast from 'components/common/toast/Toast.vue'
  //引入的axios 的模块
  import {getDetail} from 'network/detail.js'
  import {getRecommend} from 'network/detail.js'
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
      GoodsList,
      DetailBottomBar,
      Scroll,
      BackTop,
      Toast
    },
    data(){
      return{
        iid:'',
        topimages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommendInfo:[],
        themeY:[0,0,0,0],
        positionY:0,
        currentIndex:0,
        backTopShow:false
      }
    },
    methods:{
      getDetail(iid){
        getDetail(iid).then((res)=>{
          this.topimages = res.data.result.itemInfo.topImages
          let data = res.data.result
          this.iid = iid
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
      //让better-scroll重新计算可滚动区域的高度
      imageLoad(){
        this.$refs.scroll.refresh()
      },
      //获取推荐接口
      getRecommend(){
        return getRecommend().then((res)=>{
          this.recommendInfo = res.data.data.list
        })
      },
      //tab切换 点击到谁 滚动到固定的内容
      titleClick(index){
        // console.log(this.$refs.paraminfo.$el.offsetTop)
        this.themeY[1] = this.$refs.paraminfo.$el.offsetTop
        this.themeY[2] = this.$refs.commentinfo.$el.offsetTop
        this.themeY[3] = this.$refs.recommendinfo.$el.offsetTop
        this.$refs.scroll.scrollTo(0, -this.themeY[index], 100)

      },
      //监听滚动位置 到哪儿变化index联动效果
      themeScroll(position){
        this.themeY[1] = this.$refs.paraminfo.$el.offsetTop
        this.themeY[2] = this.$refs.commentinfo.$el.offsetTop
        this.themeY[3] = this.$refs.recommendinfo.$el.offsetTop
        // console.log(position)
        this.positionY = -position.y
        let length = this.themeY.length
        for(let i=0;i<this.themeY.length;i++){
          if(this.currentIndex !== i&&(i<length-1 && this.positionY>this.themeY[i]&&this.positionY<this.themeY[i+1])||
          (i === length-1&&this.positionY>this.themeY[i])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        //置顶按钮的显示和隐藏
        if(-position.y>1000){
          this.backTopShow = true
        }else{
          this.backTopShow = false
        }
      },
      //点击回到顶部
      backTopClick(){
        this.$refs.scroll.scrollTo(0,0,800)
      },
      // 加入购物车
      addShopCar(){
        const product = {}
        product.image = this.topimages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.nowPrice
        product.iid = this.iid
        //将商品添加到购物车中调用 $store中的mutations方法
        this.$store.dispatch('addCart',product).then((res)=>{
          this.$toast.toast(res,2000)
        })
        console.log(this.$store.state.cartList.length)
        console.log(this.$store.state.cartList)
      }
    },
    created(){
      this.getDetail(this.$route.params.iid)
      this.getRecommend()
    },
    mounted(){
      // this.$bus.$on('imgLoad',()=>{
      //   this.$refs.scroll.refresh()
      // })
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
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>
