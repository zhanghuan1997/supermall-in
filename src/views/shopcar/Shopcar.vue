<template>
	<div class="shopcar">
    <!-- 导航栏 -->
    <nav-bar class="shopcar-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 购物车列表 -->
    <cart-list></cart-list>
    <!-- 底部工具栏 -->
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import CartList from './childComps/CartList.vue'
  import BottomBar from './childComps/BottomBar.vue'
  import { mapGetters } from 'vuex'
  export default{
    components:{
      NavBar,
      CartList,
      BottomBar
    },
    computed:{
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style>
  .shopcar-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
  .shopcar{
    height: 100vh;
  }
</style>
