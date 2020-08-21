import req from './http.js'
// 行业大盘
export const INDUSTRY_INDEX = query => req('post', '/industry/index', query);
// 作者搜索
export const INDUSTRY_AUTHOR_SEARCH = query => req('post', '/industry/author/search', query);
// 作者详情
export const INDUSTRY_AUTHOR_INFO = query => req('post', '/industry/author/info', query);
// 作者商品列表
export const INDUSTRY_AUTHOR_GOODS = query => req('post', '/industry/author/goods', query);
