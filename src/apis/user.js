import req from './http.js'

// 消息通知列表
export const MESSAGE_LISTS = query => req('post', '/message/lists', query);
// 消息阅读状态
export const MESSAGE_READINFO = query => req('post', '/message/readinfo', query);
// 处理权限
export const USER_AUTH_DEAL = query => req('post', '/user/auth/deal', query);
// 意见与反馈列表
export const FEEDBACK_LISTS = query => req('post', '/feedback/lists', query);
// 忽略意见
export const FEEDBACK_IGNORE = query => req('post', '/feedback/ignore', query);
// 回复意见
export const FEEDBACK_REPLY = query => req('post', '/feedback/reply', query);
// 提交意见与反馈
export const FEEDBACK_ADD = query => req('post', '/feedback/add', query);
// 我的意见与反馈
export const FEEDBACK_MY = query => req('post', '/feedback/my', query);
// 申请权限
export const USER_AUTH_APPLY = query => req('post', '/user/auth/apply', query);
