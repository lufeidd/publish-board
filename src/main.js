// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios';

import headNav from './components/index';
import slideNav from './components/index';


// Ant of design 框架引入
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 字体图标
import './style/iconfont/iconfont'
// 自定义插件
import plugin from './plugin/index'
// cookies
import VueCookies from 'vue-cookies'

// 复制粘贴
import VueClipboard from 'vue-clipboard2'

import { ConfigProvider } from 'ant-design-vue';//引用
Vue.component(ConfigProvider.name, ConfigProvider);

// moment插件
import moment from 'moment';
moment.locale('zh-cn');
Vue.prototype.$moment = moment;

Vue.use(Antd);
Vue.use(headNav);
Vue.use(slideNav);
Vue.use(plugin);
Vue.use(VueClipboard);
Vue.use(VueCookies);

Vue.config.productionTip = false

// 本地存储数据localStorage
  // 1、loginState：登录状态
  // 2、headInfo：记录初始化信息
  // 3、headFirst：记录登录后是否已经初始化

// 注册一个全局前置守卫,确保要调用 next 方法，否则钩子就不会被 resolved
// router.beforeEach((to, from, next) => {
//   if (!localStorage.getItem('loginState')) {
//     localStorage.setItem('loginState', 0)
//   }
//   var _state = parseInt(localStorage.getItem('loginState'));
//   console.log(111,from.name,to.name,_state);
//   if(from.name == null && to.name == 'loginindex'){
//     if(_state == 1){
//       var replaceUrl = window.location.href.split('#')[0] + '#' + '/index';
//       window.location.replace(replaceUrl);
//       next();
//     }else{
//       next();
//     }
//     next();
//   }
//   next();
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
