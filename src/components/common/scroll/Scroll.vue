<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default{
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:Boolean
    },
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        //让父组件传过来的值决定 是不是要实时监听position
        probeType:this.probeType,
        //让父组件传过来的值决定 是不是要用下拉加载更多的方法
        pullUpLoad:this.pullUpLoad,
        click:true
      })
      //监听滚动位置
      this.scroll.on('scroll',(position)=>{
        //把监听事件传递给父亲组件
        this.$emit('scroll',position)
      })
      this.scroll.on('pullingUp', ()=>{
        this.$emit('pullingUp')
      })
    },
    data(){
      return{
        scroll:null
      }
    },
    methods:{
      //封装的点击回到顶部的方法
      scrollTo(x, y, time){
        return this.scroll.scrollTo(x, y, time)
      }
    }
  }
</script>

<style scoped>

</style>
