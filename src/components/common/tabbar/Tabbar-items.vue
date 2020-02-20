<template>
	<div class="tabbar-items" @click="goviews">
		<div :class="{active:isActive}">
			<slot name="tabbar-items-text"></slot>
		</div>
	</div>
</template>

<script>
	export default{
		components:{},
		props:{
			path:String
		},
		computed:{
			isActive(){
				return this.$route.path.indexOf(this.path) !== -1
			}
		},
		data(){
			return{
				// isActive:true
			}
		},
		methods:{
			goviews(){
				this.$router.push(this.path)
			}
		}
	}
</script>

<style>
	.tabbar-items{
		flex: 1;
		height: 48px;
		text-align: center;
		line-height: 24px;
    background: #fff;
		
	}
	.active{
		color: red;
	}
</style>
