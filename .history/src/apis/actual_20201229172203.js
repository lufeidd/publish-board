import req from './http.js'
// 新增机构
export const ORGANIZATION_ADD = query => req('post', '/organization/add', query);