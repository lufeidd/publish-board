import req from './http.js'

// 品种实时
export const INDEX = query => req('post', '/index/realtimegoods', query);