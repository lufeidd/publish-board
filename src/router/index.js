import Vue from 'vue'
import Router from 'vue-router'
// 首页
import index from '@/pages/index'
// 本社
import publishIndex from '@/pages/publish/index'
import taopu100 from '@/pages/publish/taopu100'
import core from '@/pages/publish/core'
import detail from '@/pages/publish/detail'
import region from '@/pages/publish/region'
// 竞争
import publishMonitor from '@/pages/compete/publishmonitor'
import goodsMonitor from '@/pages/compete/goodsmonitor'
import competeSet from '@/pages/compete/set'
// 行业
import industryMarket from '@/pages/industry/market'
import industryAuthors from '@/pages/industry/authors'
// 登录注册
import register from '@/pages/login/register'
import loginIndex from '@/pages/login/index'
import improve from '@/pages/login/improve'
// 平台管理
import adminIndex from '@/pages/admin/index'
import adminMember from '@/pages/admin/member'
import adminUser from '@/pages/admin/userList'
import adminFunction from '@/pages/admin/function'
import adminMemberFunction from '@/pages/admin/memberFunction'
import paramIndex from '@/pages/admin/param/index'
import paramPublish from '@/pages/admin/param/publish'
import paramCategroy from '@/pages/admin/param/categroy'
import paramGoods from '@/pages/admin/param/goods'
import adminGoodsList from '@/pages/admin/goodslist'
// 账号管理
import userInfo from '@/pages/user/information'
// 机构管理
import organizeInfo from '@/pages/organize/information'
import organizeMember from '@/pages/organize/member'
import organizeMemberFunction from '@/pages/organize/memberfunction'

// 404
import nullPage from '@/pages/404'
// 未加入机构
import noOrganize from '@/pages/noOrganize'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 本社
    {
      path: '/publish/index',
      name: 'publishindex',
      component: publishIndex,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/publish/taopu100',
      name: 'taopu100',
      component: taopu100,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/publish/core',
      name: 'core',
      component: core,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/publish/detail',
      name: 'detail',
      component: detail,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/publish/region',
      name: 'region',
      component: region,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 竞争
    {
      path: '/compete/publishmonitor',
      name: 'publishmonitor',
      component: publishMonitor,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/compete/goodsmonitor',
      name: 'goodsmonitor',
      component: goodsMonitor,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/compete/set',
      name: 'competeset',
      component: competeSet,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 行业
    {
      path: '/industry/market',
      name: 'industrymarket',
      component: industryMarket,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/industry/authors',
      name: 'industryauthors',
      component: industryAuthors,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 登录注册
    {
      path: '/login/register',
      name: 'register',
      component: register,
    },
    {
      path: '/login/index',
      name: 'loginindex',
      component: loginIndex
    },
    {
      path: '/login/improve',
      name: 'improve',
      component: improve
    },
    // 平台管理
    {
      path: '/admin/index',
      name: 'adminindex',
      component: adminIndex,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/admin/member',
      name: 'adminmember',
      component: adminMember,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/admin/user',
      name: 'adminuser',
      component: adminUser,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/admin/function',
      name: 'adminfunction',
      component: adminFunction,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/admin/memberfunction',
      name: 'memberfunction',
      component: adminMemberFunction,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/admin/goodslist',
      name: 'admingoodslist',
      component: adminGoodsList,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 平台管理--参数配置
    {
      path: '/admin/param/index',
      name: 'paramindex',
      component: paramIndex,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/admin/param/publish',
      name: 'parampublish',
      component: paramPublish,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/admin/param/categroy',
      name: 'paramcategroy',
      component: paramCategroy,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/admin/param/goods',
      name: 'paramgoods',
      component: paramGoods,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 机构管理
    {
      path: '/organize/information',
      name: 'organizeinfo',
      component: organizeInfo,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/organize/member',
      name: 'organizemember',
      component: organizeMember,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/organize/memberfunction',
      name: 'organizememberfunction',
      component: organizeMemberFunction,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 账号管理
    {
      path: '/user/information',
      name: 'userinfo',
      component: userInfo,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 404
    {
      path: '/404',
      name: 'nullpage',
      component: nullPage
    },
    // 未加入机构
    {
      path: '/noOrganize',
      name: 'noorganize',
      component: noOrganize
    },
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
