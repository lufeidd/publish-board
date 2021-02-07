import req from './http.js'

// 品种实时
export const INDEX_REALTIMEGOODS = query => req('post', '/index/realtimegoods', query);