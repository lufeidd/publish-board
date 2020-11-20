import req from './http.js'

// 登录
export const PASSPORT_LOGIN = query => req('post', '/passport/login', query);
// 退出登录
export const PASSPORT_LOGOUT = query => req('post', '/passport/logout', query);
// 注册登录
export const PASSPORT_REGISTER = query => req('post', '/passport/register', query);
// 生成邀请码
export const USER_INVITE_CREATE = query => req('post', '/user/invite/create', query);
// 生成平台级邀请码
export const USER_INVITE_ADMIN_CREATE = query => req('post', '/user/invite/admin/create', query);
// 解析邀请码
export const USER_INVITE_INFO = query => req('post', '/user/invite/info', query);
// 使用邀请码
export const USER_INVITE_CONSUME = query => req('post', '/user/invite/consume', query);
// 完善信息
export const USER_EDIT = query => req('post', '/user/edit', query);
// 检测手机号是否已注册
export const USER_CHECK = query => req('post', '/user/check', query);
// 修改密码
export const PASSPORT_UPDATEPWD = query => req('post', '/passport/updatepwd', query);
