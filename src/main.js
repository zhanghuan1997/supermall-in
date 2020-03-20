import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import toast from 'components/common/toast'
Vue.use(ElementUI);
Vue.use(toast)
Vue.config.productionTip = false
//在使用better-scroll的时候 出现了图片存在较多时 可滚动区域很少的bug
//这时候需要定义一个事件总线 来链接goodListItem组件和scroll组件
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
