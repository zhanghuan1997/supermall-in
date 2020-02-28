<template>
	<Tabbar>
			 <tabbar-item path="/home" color="blue">
				 <div slot='tabbar-items-text'>
				   <div><i class="el-icon-s-home"></i></div>
				   <div>首页</div>
				</div>
			 </tabbar-item>
			 <tabbar-item path="/category" color="blue">
				 <div slot='tabbar-items-text'>
					<div><i class="el-icon-menu"></i></div>
					<div>分类</div>
				</div>
			 </tabbar-item>
			 <tabbar-item path="/shopcar" color="blue">
				 <div slot='tabbar-items-text'>
					 <div><i class="el-icon-shopping-cart-2"></i></div>
					 <div>购物车</div>
				</div>
			 </tabbar-item>
			 <tabbar-item path="/profile" color="blue">
				<div slot='tabbar-items-text'>
					<div><i class="el-icon-s-custom"></i></div>
					<div>我的</div>
				</div>
			 </tabbar-item>
	</Tabbar>
</template>

<script>
		import Tabbar from '../../tabbar/Tabbar.vue'
		import TabbarItem from '../../tabbar/Tabbar-items.vue'
	export default{
		components:{
			Tabbar,
			TabbarItem
		}
	}
</script>

<style>
	i{
		font-size: 25px;
	}
</style>
