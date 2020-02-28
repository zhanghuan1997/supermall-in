<template>
  <div id="home">
    <!-- 首页导航栏 -->
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <scroll class="content" ref="scroll"
     :probe-type="3"
     @scroll="contentScroll"
     :pull-up-load="true"
     @pullingUp="contentUpLoad">
       <!-- 轮播图 -->
         <div class="carousel">
           <el-carousel height="160px">
             <el-carousel-item v-for="item in banner" :key="item.image">
              <a :href="item.link"><img :src="item.image"></a>
             </el-carousel-item>
           </el-carousel>
         </div>
         <!-- 首页推荐 -->
         <recommend-view :childrecommends="recommends"></recommend-view>
         <!-- 本周流行 -->
         <feature-view></feature-view>
         <!-- tab切换 -->
         <tab-control
         :titles="['流行','新款','精选']"
         class="tab-control"
         @tabClick="tabClick"></tab-control>
         <!-- goods商品展示 -->
         <goods-list :goods="goods[currentType].list"></goods-list>
     </scroll>
     <back-top @click.native="backTopClick" v-show="backTopShow"></back-top>
  </div>
</template>

<script>
  //引入次项目需要的业务逻辑组件
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/context/tabcontrol/TabControl.vue'
  import GoodsList from 'components/context/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from '../../components/context/backtop/BackTop.vue'

  //引入首页需要的子组件封装
  import RecommendView from './childcoms/RecommendView.vue'
  import FeatureView from './childcoms/FeatureView.vue'

  //引入axios模块封装
  import {getHomeMultidata} from 'network/home.js'
  import {getHomeGoods} from 'network/home.js'

  export default{
    components:{
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
      RecommendView,
      FeatureView
    },
    data(){
      return{
        banner:[],
        recommends:[],
        currentType:"pop",
        backTopShow:false,
        goods:{
          "pop":{page:0, list:[]},
          "new":{page:0, list:[]},
          "sell":{page:0, list:[]}
        }
      }
    },
    methods:{
      //获取轮播图 推荐信息
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res)
          this.banner = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      //获取商品列表
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page +=1
        })
      },
      // 点击切换Tab 信息
      tabClick(index){
        if(index === 0){
          this.currentType = 'pop'
        }else if(index === 1){
          this.currentType = 'new'
        }else if(index === 2){
          this.currentType = 'sell'
        }
      },
      //点击回到顶部
      backTopClick(){
        this.$refs.scroll.scrollTo(0,0,800)
      },
      //置顶按钮的显示和隐藏
      contentScroll(position){
        if(-position.y>1000){
          this.backTopShow = true
        }else{
          this.backTopShow = false
        }
      },
      //下拉展示更多
      contentUpLoad(){
        this.getHomeGoods(this.currentType)
      }
    },
    created(){
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    }
  }
</script>

<style scoped>
  .home-nav{
    background: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    z-index: 9;
  }
  .carousel img{
    height: 160px;
    width: 100%;
  }
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .tab-control{
    position: sticky;
    top: 40px;
    z-index: 100;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 48px;
    left: 0;
    right: 0;
  }
</style>
