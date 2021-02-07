import req from './http.js'

// 品种s
export const ORGANIZATION_ADD = query => req('post', '/index/realtimegoods', query);