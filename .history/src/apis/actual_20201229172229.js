import req from './http.js'

// 品种实时
export const INDEX_ = query => req('post', '/index/realtimegoods', query);