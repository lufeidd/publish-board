import req from './http.js'
// 发送验证码
export const COMMON_CAPTCHA_SMS = query => req('post', '/common/captcha/sms', query);
// 出版社列表
export const PUBLISHER_GETS = query => req('post', '/publisher/gets', query);
// 出版社信息获取
export const PUBLISHER_GET = query => req('post', '/publisher/get', query);
// 供应商列表
export const SUPPLIER_GETS = query => req('post', '/supplier/gets', query);
// 供应商详情
export const SUPPLIER_GET = query => req('post', '/supplier/get', query);
// 基础信息
export const PASSPORT_INIT = query => req('post', '/passport/init', query);
// 获取分类列表
export const COMMON_CATEGORY = query => req('post', '/common/category', query);
// 获取有销售点数的分类列表
export const COMMON_PUBLISHERCATEGORY = query => req('post', '/common/suppliercategory', query);
// 获取国家列表
export const COMMON_COUNTRY = query => req('post', '/common/country', query);
// 上传文件
export const COMMON_UPLOAD = query => req('post', '/common/upload', query);
// 获取时间戳
export const COMMON_TIMESTAMP = query => req('post', '/common/timestamp', query);
