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
// 机构竞争p
export const ORGANIZATION_GET = query => req('post', '/organization/get', query);

// 用户列表 基础信息
export const USER_BASEGETS = query => req('post', '/user/basegets', query);
// 用户列表（含机构）
export const USER_GETSINCLUDE = query => req('post', '/user/gets', query);
// 注销用户
export const USER_DELETE = query => req('post', '/user/delete', query);
// 删除用户
export const USER_DESTROY = query => req('post', '/user/destroy', query);
// 恢复用户
export const USER_ACTIVE = query => req('post', '/user/active', query);
// 用户已加入机构列表
export const USER_ORGANIZATION_GETS = query => req('post', '/user/organization/gets', query);
// 用户移出机构
export const USER_ORGANIZATION_DELETE = query => req('post', '/organization/member/delete', query);
// 获取用户在机构中的权限列表
export const USER_ORGANIZATION_AUTH = query => req('post', '/organization/member/auth/gets', query);
// 修改用户在机构中的权限
export const ORGANIZATION_MEMBER_AUTH_EDIT = query => req('post', '/organization/member/auth/edit', query);
// 重置用户密码
export const ORGANIZATION_MEMBER_RESETPWD = query => req('post', '/user/resetpwd', query);

// 平台级权限列表
export const ADMIN_AUTH_LISTS = query => req('post', '/admin/auth/lists', query);
// 平台级权限配置
export const ADMIN_AUTH_EDIT = query => req('post', '/admin/auth/edit', query);

// 大事件部分
export const EVENT_LISTS = query => req('post', '/event/lists', query);
// 关键字列表
export const EVENT_KEYWORDS_LISTS = query => req('post', '/event/keywords/lists', query);
// 新增事件
export const EVENT_ADD = query => req('post', '/event/add', query);
// 修改事件
export const EVENT_UPDATE = query => req('post', '/event/update', query);
// 删除事件
export const EVENT_DELETE = query => req('post', '/event/delete', query);
// 查询某一年全部事件
export const EVENT_ALL = query => req('post', '/event/all', query);
// 事件详情
export const EVENT_DETAIL = query => req('post', '/event/detail', query);
// 关联品种列表
export const EVENT_GOODS_LISTS = query => req('post', '/event/goods/lists', query);
// 添加关联商品
export const EVENT_GOODS_ADD = query => req('post', '/event/goods/add', query);
// 删除商品关联
export const EVENT_GOODS_DELETE = query => req('post', '/event/goods/delete', query);
// 事件版本列表
export const EVENT_VERSION_LISTS = query => req('post', '/event/version/lists', query);
// 版本新增
export const EVENT_VERSION_ADD = query => req('post', '/event/version/add', query);
// 编辑版本
export const EVENT_VERSION_UPDATE = query => req('post', '/event/version/update', query);
// 删除版本
export const EVENT_VERSION_DELETE = query => req('post', '/event/version/delete', query);

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


// 帮助中心管理
// 帮助列表
export const HELP_LISTS = query => req('post', '/help/lists', query);
// 新增帮助
export const HELP_ADD = query => req('post', '/help/add', query);
// 修改帮助
export const HELP_EDIT = query => req('post', '/help/edit', query);
// 删除帮助
export const HELP_DELETE = query => req('post', '/help/delete', query);
