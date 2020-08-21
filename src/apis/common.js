import req from './http.js'
// 发送验证码
export const COMMON_CAPTCHA_SMS = query => req('post', '/common/captcha/sms', query);
// 出版社列表
export const PUBLISHER_GETS = query => req('post', '/publisher/gets', query);
// 出版社信息获取
export const PUBLISHER_GET = query => req('post', '/publisher/get', query);
// 基础信息
export const PASSPORT_INIT = query => req('post', '/passport/init', query);
// 获取分类列表
export const COMMON_CATEGORY = query => req('post', '/common/category', query);
