import req from './http.js'

// 品种实时
export const INDEX_REALTIMEGO = query => req('post', '/index/realtimegoods', query);