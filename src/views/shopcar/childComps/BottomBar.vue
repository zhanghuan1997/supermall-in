<template>
  <div class="bottom-bar" v-show="showBottomBar">
    <div class="check-content">
      <check-button class="check-button"
      :is-checked="isSelectAll"
      @click.native="checkAll"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate">
      结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/common/checkbutton/CheckButton.vue'
  import { mapGetters } from 'vuex'
  export default{
    components:{
      CheckButton
    },
    // data(){
    //   return{
    //     showBottomBar:true
    //   }
    // },
    computed:{
      ...mapGetters(['cartList']),
      //返回选中的价格合计
      totalPrice(){
        return '￥' + this.cartList.filter((item)=>{
          return item.checked
        }).reduce((prv,cur)=>{
          return prv + cur.price * cur.count
        },0)
      },
      //返回选中的数组长度
      checkLength(){
        return this.cartList.filter((item)=>{
          return item.checked
        }).length
      },
      isSelectAll(){
        if(!this.cartList.length){
          return false
        }
        //如果有一个不选中 返回fasle 没有不选中  全选中  返回true
        return !this.cartList.find(item => !item.checked)
      },
      
      showBottomBar(){
        if(this.cartList.length){
          return true
        }else{
          return false
        }
      }
    },
    methods:{
      checkAll(){
        if(!this.isSelectAll){
          this.cartList.forEach(item => item.checked = true)
        }else{
           this.cartList.forEach(item => item.checked = false)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    background-color: #eee;
    height: 40px;
    position: relative;
    line-height: 40px;
    font-size: 14px;
  }
  .check-content{
    display: flex;
    align-items: center;
    width: 60px;
    margin-left: 5px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .calculate{
    width: 80px;
    background-color: orange;
    color: #EEEEEE;
  }
  .price{
    flex: 1;
  }
</style>
