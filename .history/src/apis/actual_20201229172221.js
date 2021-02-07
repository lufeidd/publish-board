import req from './http.js'

// 品种实时
export const ORGANIZATION_ADD = query => req('post', '/index/realtimegoods', query);