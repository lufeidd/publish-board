import req from './http.js'
// 销量预测
export const FORECAST_DMS = query => req('post', '/forecast/dms', query);
获取pin