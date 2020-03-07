<template>
  <div class="topimages">
    <div class="carousel">
      <el-carousel height="300px" indicator-position="none">
        <el-carousel-item v-for="item in topImages" :key="item">
          <img :src="item">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default{
    components:{},
    props:{
      topImages:Array
    },
    methods:{
    }
  }
</script>

<style scoped>
 .carousel img{
   width: 100%;
 }
</style>
