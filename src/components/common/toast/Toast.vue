<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default{
    components:{},
    methods:{
      toast(message,time){
        this.message = message
        this.isShow = true
        setTimeout(()=>{
          this.isShow = false
          this.message = ''
        },time)

      }
    },
    data(){
      return{
        message:'',
        isShow:false
      }
    }
  }
</script>

<style>
  .toast{
    background-color: rgba(0,0,0,.7);
    color: #fff;
    position: fixed;
    left: 50%;
    top:50%;
    z-index: 999;
    transform: translate(-50%,-50%);

  }
  .toast div{
    padding: 5px 5px;
  }
</style>
