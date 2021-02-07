import req from './http.js'

// 首页基本信息
export const INDEX_PUBLISHERINFO = query => req('post', '/index/supplierinfo', query);
// 排行榜
export const INDEX_RANKS = query => req('post', '/index/ranks', query);
// 竞社信息
export const INDEX_COMPETE = query => req('post', '/index/compete', query);
// 实时数据
export const INDEX_REALTIME = query => req('post', '/index/realtime', query);
// 实时数据品种实时
export const INDEX_REALTIMEGOODS = query => req('post', '/index/realtimegoods', query);
// 临期事件
export const EVENT_RECENT = query => req('post', '/event/recent', query);
