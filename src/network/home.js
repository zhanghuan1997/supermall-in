import {request} from './request.js'
//home  首页所需要传参在这个页面写
// 首页轮播图 本周流行
export function getHomeMultidata(){
    return request({
      url:'/home/multidata'
    })
}
// 首页流行 新款 精选 商品列表
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
