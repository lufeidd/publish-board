import req from './http.js'

// 新增机构
export const ORGANIZATION_ADD = query => req('post', '/organization/add', query);
// 编辑机构
export const ORGANIZATION_EDIT = query => req('post', '/organization/edit', query);
// 删除机构
export const ORGANIZATION_DELETE = query => req('post', '/organization/delete', query);
// 注销机构
export const ORGANIZATION_LOGOFF = query => req('post', '/organization/logoff', query);
// 机构权限列表
export const ORGANIZATION_AUTH_GETS = query => req('post', '/organization/auth/gets', query);
// 成员列表
export const ORGANIZATION_MEMBER_GETS = query => req('post', '/organization/member/gets', query);
// 删除成员
export const ORGANIZATION_MEMBER_DELETE = query => req('post', '/organization/member/delete', query);
// 添加成员
export const ORGANIZATION_MEMBER_ADD = query => req('post', '/organization/member/add', query);
// 设置成员类型
export const ORGANIZATION_MEMBER_TYPESET = query => req('post', '/organization/member/typeset', query);
// 机构成员信息
export const ORGANIZATION_MEMBER_INFO = query => req('post', '/user/get', query);
// 机构列表
export const ORGANIZATION_GETS = query => req('post', '/organization/gets', query);
// 机构权限修改
export const ORGANIZATION_AUTH_EDIT = query => req('post', '/organization/auth/edit', query);
// 恢复机构
export const ORGANIZATION_LOGON = query => req('post', '/organization/logon', query);
// 机构信息
export const ORGANIZATION_GET = query => req('post', '/organization/get', query);

// 用户列表 基础信息
export const USER_BASEGETS = query => req('post', '/user/basegets', query);
// 用户列表（含机构）
export const USER_GETSINCLUDE = query => req('post', '/user/gets', query);
// 删除用户
export const USER_DELETE = query => req('post', '/user/delete', query);
// 用户已加入机构列表
export const USER_ORGANIZATION_GETS = query => req('post', '/user/organization/gets', query);
// 用户移出机构
export const USER_ORGANIZATION_DELETE = query => req('post', '/organization/member/delete', query);
// 获取用户在机构中的权限列表
export const USER_ORGANIZATION_AUTH = query => req('post', '/organization/member/auth/gets', query);
// 修改用户在机构中的权限
export const ORGANIZATION_MEMBER_AUTH_EDIT = query => req('post', '/organization/member/auth/edit', query);

// 参数配置
// 系数列表
export const RATIO_GETS = query => req('post', '/ratio/gets', query);
// 系数日志
export const RATIO_LOGS = query => req('post', '/ratio/logs', query);
// 新增系数
export const RATIO_ADD = query => req('post', '/ratio/add', query);
// 修改系数
export const RATIO_EDIT = query => req('post', '/ratio/edit', query);
// 当前系数
export const RATIO_CURREN = query => req('post', '/ratio/current', query);
