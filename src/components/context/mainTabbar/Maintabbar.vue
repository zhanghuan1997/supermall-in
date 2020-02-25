<template>
	<Tabbar>
			 <tabbar-item path="/home" color="blue" class="i-line">
				 <div slot='tabbar-items-text'>
				   <div class="i-line"><i class="el-icon-s-home"></i></div>
				   <div class="ii-line">首页</div>
				</div>
			 </tabbar-item>
			 <tabbar-item path="/category" color="blue" class="i-line">
				 <div slot='tabbar-items-text'>
					<div><i class="el-icon-menu"></i></div>
					<div>分类</div>
				</div>
			 </tabbar-item>
			 <tabbar-item path="/shopcar" color="blue" class="i-line">
				 <div slot='tabbar-items-text'>
					 <div><i class="el-icon-shopping-cart-2"></i></div>
					 <div>购物车</div>
				</div>
			 </tabbar-item>
			 <tabbar-item path="/profile" color="blue" class="i-line">
				<div slot='tabbar-items-text'>
					<div><i class="el-icon-s-custom"></i></div>
					<div>我的</div>
				</div>
			 </tabbar-item>
	</Tabbar>
</template>

<script>
		import Tabbar from 'components/common/tabbar/Tabbar.vue'
		import TabbarItem from 'components/common/tabbar/Tabbar-items.vue'
	export default{
		components:{
			Tabbar,
			TabbarItem
		}
	}
</script>

<style>
	i{
		font-size: 24px;
    line-height: 10px;
	}

  .i-line{
    line-height: 20px;
  }
</style>
