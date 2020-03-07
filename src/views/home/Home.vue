<template>
  <div id="home">
    <!-- 首页导航栏 -->
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <!-- 在做吸顶效果时 新复制出来的tabcontrol 目的是在滚动到一定位置时 让他显示 -->
     <tab-control
     :titles="['流行','新款','精选']"
     class="tab-control1"
     @tabClick="tabClick"
     ref="tabcontrol1"
     v-show="isTabControlShow"
     ></tab-control>
     <!-- 滚动区域 -->
     <scroll class="content" ref="scroll"
     :probe-type="3"
     @scroll="contentScroll"
     :pull-up-load="true"
     @pullingUp="contentUpLoad">
       <!-- 轮播图 -->
         <div class="carousel">
           <el-carousel height="160px">
             <el-carousel-item v-for="item in banner" :key="item.image">
              <a :href="item.link"><img :src="item.image" @load="imageLoad"></a>
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
         @tabClick="tabClick" ref="tabcontrol"></tab-control>
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
        isTabControlShow:false,
        tabTop:0,
        scrollY:0,
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
        // 做完吸顶效果后  index发生了变化   保持两个选中的index相等
        this.$refs.tabcontrol.currentIndex = index
        this.$refs.tabcontrol.currentIndex = index
      },
      //点击回到顶部
      backTopClick(){
        this.$refs.scroll.scrollTo(0,0,800)
      },
      //监听滚动位置
      contentScroll(position){
        //置顶按钮的显示和隐藏
        if(-position.y>1000){
          this.backTopShow = true
        }else{
          this.backTopShow = false
        }
        //吸顶效果
        if(-position.y>this.tabTop){
          this.isTabControlShow = true
        }else{
          this.isTabControlShow = false
        }
      },
      //下拉展示更多
      contentUpLoad(){
        this.getHomeGoods(this.currentType)
      },
      //轮播图图片加载完成后的offsetop
      imageLoad(){
        this.tabTop = this.$refs.tabcontrol.$el.offsetTop
      },
      //防抖动函数
      debounce(func,delay){
        let timer = null
        return function(...args){
          if(timer) clearTimeout(timer)
          timer = setTimeout(()=>{
            func.apply(this,args)
          },delay)
        }
      }
    },
    created(){
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      //防抖动的调用
      // const refresh = this.debounce(this.$refs.scroll.refresh,1000)
      //调用goodListItem中传来的imgLoad
      this.$bus.$on('imgLoad',()=>{
        this.$refs.scroll.refresh()
      })
    },
    //进入首页调用的方法
    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.scrollY,0)
    },
    //离开首页调用的方法
    deactivated(){
      this.scrollY = this.$refs.scroll.scroll.y
    }
  }
</script>

<style scoped>

  .home-nav{
    background: var(--color-tint);
    color: #fff;
    /* 下面这段样式 是在没用better-scroll的时候 防止导航栏跟着滑动的样式 */
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
/* 下面这段样式 是在没用better-scroll的时候吸顶的样式 */
/*    position: sticky;
    top: 40px;
    z-index: 100 */;
  }
  .tab-control1{
    position: relative;
    z-index: 9;
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
