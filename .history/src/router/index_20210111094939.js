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
import actualBoard from '@/pages/actual/board'
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
import inquireGoodsList from '@/pages/inquire/goodslist'
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
        
      }
    },
    // 本社
    {
      path: '/publish/index',
      name: 'publishindex',
      component: publishIndex,
      meta: {
        
      }
    },
    {
      path: '/publish/taopu100',
      name: 'taopu100',
      component: taopu100,
      meta: {
        
      }
    },
    {
      path: '/publish/core',
      name: 'core',
      component: core,
      meta: {
        
      }
    },
    {
      path: '/publish/detail',
      name: 'detail',
      component: detail,
      meta: {
        
      }
    },
    {
      path: '/publish/region',
      name: 'region',
      component: region,
      meta: {
        
      }
    },
    {
      path: '/publish/authors',
      name: 'publishauthors',
      component: publishAuthors,
      meta: {
        
      }
    },
    {
      path: '/publish/reader',
      name: 'publishreader',
      component: publishReader,
      meta: {
        
      }
    },
    {
      path: '/publish/newproduct',
      name: 'newproduct',
      component: newProduct,
      meta: {
        
      }
    },
    // 实时数据
    {
      path: '/actual/board',
      name: 'actualboard',
      component: actualBoard,
      meta: {
        
      }
    },
    // 竞争
    {
      path: '/compete/publishmonitor',
      name: 'publishmonitor',
      component: publishMonitor,
      meta: {
        
      }
    },
    {
      path: '/compete/goodsmonitor',
      name: 'goodsmonitor',
      component: goodsMonitor,
      meta: {
        
      }
    },
    {
      path: '/compete/set',
      name: 'competeset',
      component: competeSet,
      meta: {
        
      }
    },
    // 行业
    {
      path: '/industry/market',
      name: 'industrymarket',
      component: industryMarket,
      meta: {
        
      }
    },
    {
      path: '/industry/authors',
      name: 'industryauthors',
      component: industryAuthors,
      meta: {
        
      }
    },
    {
      path: '/industry/authordetail',
      name: 'authordetail',
      component: industryAuthorDetail,
      meta: {
        
      }
    },
    {
      path: '/industry/authoredit',
      name: 'authoredit',
      component: authorEdit,
      meta: {
        
      }
    },
    {
      path: '/industry/goodsrank',
      name: 'goodsrank',
      component: goodsRank,
      meta: {
        
      }
    },
    {
      path: '/industry/caterank',
      name: 'caterank',
      component: cateRank,
      meta: {
        
      }
    },
    {
      path: '/industry/regionrank',
      name: 'regionrank',
      component: regionRank,
      meta: {
        
      }
    },
    // 查询
    {
      path: '/inquire/search',
      name: 'inquiresearch',
      component: inquireSearch,
      meta: {
        
      }
    },
    {
      path: '/inquire/rank',
      name: 'inquirerank',
      component: inquireRank,
      meta: {
        
      }
    },
    {
      path: '/inquire/detail',
      name: 'inquiredetail',
      component: inquireDetail,
      meta: {
        
      }
    },
    // 应用
    {
      path: '/application/event',
      name: 'applicationevent',
      component: applicationEvent,
      meta: {
        
      }
    },
    {
      path: '/application/detail',
      name: 'eventdetail',
      component: eventDetail,
      meta: {
        
      }
    },
    {
      path: '/application/saleforcast',
      name: 'saleforcast',
      component: saleForcast,
      meta: {
        
      }
    },
    // 帮助中心
    {
      path: '/help/index',
      name: 'helpindex',
      component: helpIndex,
      meta: {
        
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
        
      }
    },
    {
      path: '/admin/member',
      name: 'adminmember',
      component: adminMember,
      meta: {
        
      }
    },
    {
      path: '/admin/user',
      name: 'adminuser',
      component: adminUser,
      meta: {
        
      }
    },
    {
      path: '/admin/function',
      name: 'adminfunction',
      component: adminFunction,
      meta: {
        
      }
    },
    {
      path: '/admin/memberfunction',
      name: 'memberfunction',
      component: adminMemberFunction,
      meta: {
        
      }
    },
    {
      path: '/admin/goodslist',
      name: 'goodslist',
      component: inquireGoodsList,
      meta: {
        
      }
    },
    // 平台管理--大事件管理
    {
      path: '/admin/event',
      name: 'adminevent',
      component: adminEvent,
      meta: {
        
      }
    },
    // 平台管理--参数配置
    {
      path: '/admin/param/index',
      name: 'paramindex',
      component: paramIndex,
      meta: {
        
      }
    },
    {
      path: '/admin/param/publish',
      name: 'parampublish',
      component: paramPublish,
      meta: {
        
      }
    },
    {
      path: '/admin/param/categroy',
      name: 'paramcategroy',
      component: paramCategroy,
      meta: {
        
      }
    },
    {
      path: '/admin/param/goods',
      name: 'paramgoods',
      component: paramGoods,
      meta: {
        
      }
    },
    // 平台管理--帮助中心管理
    {
      path: '/admin/help',
      name: 'adminhelp',
      component: adminHelp,
      meta: {
        
      }
    },
    // 平台管理--意见与反馈
    {
      path: '/admin/feedback',
      name: 'adminfeedback',
      component: adminFeedback,
      meta: {
        
      }
    },
    // 平台管理--产品动态
    {
      path: '/admin/dynamic',
      name: 'admindynamic',
      component: adminDynamic,
      meta: {
        
      }
    },
    // 平台管理--平台级权限配置
    {
      path: '/admin/adminfunction',
      name: 'adminset',
      component: adminSet,
      meta: {
        
      }
    },
    // 机构管理
    {
      path: '/organize/information',
      name: 'organizeinfo',
      component: organizeInfo,
      meta: {
        
      }
    },
    {
      path: '/organize/member',
      name: 'organizemember',
      component: organizeMember,
      meta: {
        
      }
    },
    {
      path: '/organize/memberfunction',
      name: 'organizememberfunction',
      component: organizeMemberFunction,
      meta: {
        
      }
    },
    // 账号管理
    {
      path: '/user/information',
      name: 'userinfo',
      component: userInfo,
      meta: {
        
      }
    },
    {
      path: '/user/notice',
      name: 'usernotice',
      component: userNotice,
      meta: {
        
      }
    },
    {
      path: '/user/suggesstion',
      name: 'usersuggesstion',
      component: userSuggesstion,
      meta: {
        
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
