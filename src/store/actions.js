export default{
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      //find方法 oldproduct就是item.iid 和payload.iid相等的那个对象
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if(oldProduct){
        //如果有值  让他的数量加1
        // oldProduct.count += 1
        context.commit('addCount',oldProduct)
        resolve('当前商品数量加1')
      }else{
        //如果没有值 就给他添加一个count属性为1 然后添加到state.cartList数组中
        payload.count = 1
        // state.cartList.push(payload)
        context.commit('addCart',payload)
        resolve('加入购物车成功')
      }
    })
  }
}
