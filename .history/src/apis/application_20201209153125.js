import req from './http.js'
// 销量预测
export const FORECAST_DMS = query => req('post', '/forecast/dms', query);
// 获取品种
export const FORECAST_ = query => req('post', '/forecast/goods', query);