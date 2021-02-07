import req from './http.js'
// 新增竞争
export const PUBLISHER_COMPETE_ADD = query => req('post', '/compete/add', query);
// 删除竞争
export const PUBLISHER_COMPETE_DELETE = query => req('post', '/compete/delete', query);
// 机构竞争配置
export const PUBLISHER_COMPETE_INIT = query => req('post', '/compete/init', query);
// 竞争列表
export const PUBLISHER_COMPETE_GETS = query => req('post', '/compete/gets', query);
// 品种竞争监控列表
export const COMPETE_MONITOR_GOODS_LISTS = query => req('post', '/compete/monitor/goods/lists', query);
// 竞社监控列表
export const COMPETE_MONITOR_PUBLISHER_LISTS = query => req('post', '/compete/monitor/supplier/lists', query);
// 竞争数据信息
export const COMPETE_MONITOR_PUBLISHER_INFO = query => req('post', '/compete/monitor/supplier/info', query);
// 竞争趋势--折线图
export const COMPETE_MONITOR_PUBLISHER_TREND = query => req('post', '/compete/monitor/supplier/trend', query);
// 竞争
export const COMPETE_MONITOR_PUBLISHER_TREND = query => req('post', '/compete/monitor/supplier/trend', query);