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
import publishAuthors from '@/pages/publish/authors'
import publishReader from '@/pages/publish/reader'
import newProduct from '@/pages/publish/newproduct'
// 实时数据
import newProduct from '@/pages/actual/board'
// 竞争
import publishMonitor from '@/pages/compete/publishmonitor'
import goodsMonitor from '@/pages/compete/goodsmonitor'
import competeSet from '@/pages/compete/set'
// 行业
import industryMarket from '@/pages/industry/market'
import industryAuthors from '@/pages/industry/authors'
import industryAuthorDetail from '@/pages/industry/authordetail'
import authorEdit from '@/pages/industry/authoredit'
import goodsRank from '@/pages/industry/goodsrank'
import cateRank from '@/pages/industry/caterank'
import regionRank from '@/pages/industry/regionrank'
// 查询
import inquireSearch from '@/pages/inquire/search'
import inquireRank from '@/pages/inquire/rank'
import inquireDetail from '@/pages/inquire/detail'
// 应用
import applicationEvent from '@/pages/application/event'
import eventDetail from '@/pages/application/detail'
import saleForcast from '@/pages/application/saleforcast'
// 帮助中心
import helpIndex from '@/pages/help/index'
// 登录注册
import register from '@/pages/login/register'
import loginIndex from '@/pages/login/index'
import improve from '@/pages/login/improve'
import editPassword from '@/pages/login/editpassword'
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
import adminEvent from '@/pages/admin/event'
import adminHelp from '@/pages/admin/help'
import adminFeedback from '@/pages/admin/feedback'
import adminDynamic from '@/pages/admin/dynamic'
import adminSet from '@/pages/admin/adminfunction'
// 账号管理
import userInfo from '@/pages/user/information'
import userNotice from '@/pages/user/notice'
import userSuggesstion from '@/pages/user/suggesstion'
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
      path: '/index',
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
    {
      path: '/publish/authors',
      name: 'publishauthors',
      component: publishAuthors,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/publish/reader',
      name: 'publishreader',
      component: publishReader,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/publish/newproduct',
      name: 'newproduct',
      component: newProduct,
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
    {
      path: '/industry/authordetail',
      name: 'authordetail',
      component: industryAuthorDetail,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/industry/authoredit',
      name: 'authoredit',
      component: authorEdit,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/industry/goodsrank',
      name: 'goodsrank',
      component: goodsRank,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/industry/caterank',
      name: 'caterank',
      component: cateRank,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/industry/regionrank',
      name: 'regionrank',
      component: regionRank,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 查询
    {
      path: '/inquire/search',
      name: 'inquiresearch',
      component: inquireSearch,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/inquire/rank',
      name: 'inquirerank',
      component: inquireRank,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/inquire/detail',
      name: 'inquiredetail',
      component: inquireDetail,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 应用
    {
      path: '/application/event',
      name: 'applicationevent',
      component: applicationEvent,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/application/detail',
      name: 'eventdetail',
      component: eventDetail,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/application/saleforcast',
      name: 'saleforcast',
      component: saleForcast,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 帮助中心
    {
      path: '/help/index',
      name: 'helpindex',
      component: helpIndex,
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
      path: '/',
      name: 'loginindex',
      component: loginIndex
    },
    {
      path: '/login/improve',
      name: 'improve',
      component: improve
    },
    {
      path: '/login/editpassword',
      name: 'editpassword',
      component: editPassword
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
    // 平台管理--大事件管理
    {
      path: '/admin/event',
      name: 'adminevent',
      component: adminEvent,
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
    // 平台管理--帮助中心管理
    {
      path: '/admin/help',
      name: 'adminhelp',
      component: adminHelp,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 平台管理--意见与反馈
    {
      path: '/admin/feedback',
      name: 'adminfeedback',
      component: adminFeedback,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 平台管理--产品动态
    {
      path: '/admin/dynamic',
      name: 'admindynamic',
      component: adminDynamic,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    // 平台管理--平台级权限配置
    {
      path: '/admin/adminfunction',
      name: 'adminset',
      component: adminSet,
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
    {
      path: '/user/notice',
      name: 'usernotice',
      component: userNotice,
      meta: {
        requireAuth: true // 需要登录才能进入的页面可以增加一个meta属性
      }
    },
    {
      path: '/user/suggesstion',
      name: 'usersuggesstion',
      component: userSuggesstion,
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
    {
      path: '*', // 页面不存在的情况下会跳到404页面
      redirect: '/404',
      name: 'nopage',
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
   }
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
