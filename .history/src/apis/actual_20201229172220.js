import req from './http.js'

// 品种shishi
export const ORGANIZATION_ADD = query => req('post', '/index/realtimegoods', query);