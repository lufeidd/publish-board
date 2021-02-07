import axios from 'axios'
import qs from "Qs";
import Vue from 'vue';
import { message } from 'ant-design-vue';

// 创建axios的一个实例
var obj = {};
// run dev
// obj.baseURL = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + '/apis';

// run build
obj.baseURL =  window.location.protocol + "//" + window.location.hostname + '/apis';
// console.log(123, window.location.protocol, window.location.hostname)
obj.timeout = 30000;

// 一、请求拦截器 忽略
var instance = axios.create(obj);
instance.interceptors.request.use(function (config) {
  config.credentials = true;
  // console.log(111,config)
  return config;
}, function (error) {
  // 对请求错误做些什么
  // console.log('request error');
  return Promise.reject(error);
});
// axios.defaults.withCredentials = true;

// 二、响应拦截器 忽略
instance.interceptors.response.use(function (response) {
  if (response.status === 200) {
    // 处理请求成功的逻辑
    return response.data; // 必须返回，后面的接口的then，才能获取response
  } else {
    if (response.status >= 500) {
      // 错误处理
    } else if (response.status === 404) {
      // ...
    }
    return response.data; // 必须返回
  }
}, function (error) {

  // 网络响应超时，调整到超时页面
  // var replaceUrl = window.location.href.split('#')[0] + '#/404';

  // console.log('网络请求超时:', replaceUrl);
  // window.location.href = replaceUrl;
  message.info('网络响应超时，请刷新重试');
  // Vue.prototype.$isLoading = false;
  // console.log(Vue.prototype.$isLoading)
  return Promise.reject(error);
});

/**
* 使用es6的export default导出了一个函数，导出的函数代替axios去帮我们请求数据，
* 函数的参数及返回值如下：
* @param {String} method  请求的方法：get、post、delete、put
* @param {String} url     请求的url:
* @param {Object} data    请求的参数
* @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
*/

export default function (method, url, data = null) {
  method = method.toLowerCase();
  // console.log(789,data);
  if (method === 'post') {
    return instance.post(url, qs.stringify(data));
  } else if (method === 'get') {
    return instance.get(url, qs.stringify(data));
  } else if (method === 'delete') {
    return instance.delete(url, qs.stringify(data));
  } else if (method === 'put') {
    return instance.put(url, qs.stringify(data));
  } else {
    console.error('未知的method' + method);
    return false;
  }
}
