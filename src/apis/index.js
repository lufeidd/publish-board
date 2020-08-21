import req from './http.js'

// 首页基本信息
export const INDEX_PUBLISHERINFO = query => req('post', '/index/publisherinfo', query);
// 排行榜
export const INDEX_RANKS = query => req('post', '/index/ranks', query);
