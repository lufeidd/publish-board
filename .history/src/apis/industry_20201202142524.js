import req from './http.js'
// 行业大盘
export const INDUSTRY_INDEX = query => req('post', '/industry/index', query);
// 作者搜索
export const INDUSTRY_AUTHOR_SEARCH = query => req('post', '/industry/author/search', query);
// 作者详情
export const INDUSTRY_AUTHOR_INFO = query => req('post', '/industry/author/info', query);
// 作者商品列表
export const INDUSTRY_AUTHOR_GOODS = query => req('post', '/industry/author/goods', query);
// 作者商品列表
export const INDUSTRY_AUTHOR_LISTS = query => req('post', '/industry/author/lists', query);
// 作者编辑
export const INDUSTRY_AUTHOR_EDIT = query => req('post', '/industry/author/edit', query);
// 作者合并
export const INDUSTRY_AUTHOR_MERGE = query => req('post', '/industry/author/merge', query);
// 全品种销售排行
export const INDUSTRY_RANK_GOODS = query => req('post', '/industry/rank/goods', query);
// 全品种涨幅排行
export const INDUSTRY_RANK_GOODSINCR = query => req('post', '/industry/rank/goodsincr', query);
// 新品排行
export const INDUSTRY_RANK_GOODSNEW = query => req('post', '/industry/rank/goodsnew', query);
// 类目排行
export const INDUSTRY_RANK_CATE = query => req('post', '/industry/rank/cate', query);
// 地域排行
export const INDUSTRY_RANK_REGION = query => req('post', '/industry/rank/region', query);
// 供应商销售排行
export const INDUSTRY_RANK_SUPPLIER = query => req('post', '/industry/rank/supplier', query);
// 作者历史搜索
export const INDUSTRY_AUTHOR_HISTORY = query => req('post', '/industry/author/history', query);
