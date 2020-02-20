<template>
  <div id="home">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
       <div class="carousel">
         <el-carousel height="160px">
           <el-carousel-item v-for="item in banner" :key="item.image">
            <a :href="item.link"><img :src="item.image"></a>
           </el-carousel-item>
         </el-carousel>
       </div>
       <recommend-view :childrecommends="recommends"></recommend-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import {getHomeMultidata} from 'network/home.js'
  import RecommendView from './childcoms/RecommendView.vue'



  export default{
    components:{
      NavBar,
      RecommendView
    },
    data(){
      return{
        banner:[],
        recommends:[]
      }
    },
    created(){

      getHomeMultidata().then(res=>{
        console.log(res)
        this.banner = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    }
  }
</script>

<style>
  .home-nav{
    background: var(--color-tint);
    color: #fff;
  }
  .carousel img{
    height: 150px;
    width: 100%
  }
</style>
