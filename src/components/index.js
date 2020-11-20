// 头部
import headNav from './headNav.vue';
// 侧边导航
import slideNav from './slideNav.vue'
// 页面无权限
import pageNoPower from './pageNoPower.vue'
// 页面某个模块无权限
import modelNoPower from './modelNoPower.vue'
// 时间选择
import timeChoose from './timeChoose.vue'
// 页面加载loading
import loading from './loading.vue'

export default {
    install: function (Vue, options) {
        Vue.component('HeadNav', headNav);
        Vue.component('SlideNav', slideNav);
        Vue.component('PageNoPower', pageNoPower);
        Vue.component('ModelNoPower', modelNoPower);
        Vue.component('TimeChoose', timeChoose);
        Vue.component('Loading', loading);
    }
}
