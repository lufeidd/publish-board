import req from './http.js'

// 品种实时
export const INDEX_REA = query => req('post', '/index/realtimegoods', query);