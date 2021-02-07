import req from './http.js'

// pinzhon
export const ORGANIZATION_ADD = query => req('post', '/index/realtimegoods', query);