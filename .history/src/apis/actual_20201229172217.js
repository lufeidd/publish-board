import req from './http.js'

// pi
export const ORGANIZATION_ADD = query => req('post', '/index/realtimegoods', query);