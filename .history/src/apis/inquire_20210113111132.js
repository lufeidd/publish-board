import req from './http.js'
// 出版单位列表
export const QUERY_SUPPLIER_LISTS = query => req('post', '/query/supplier/lists', query);
// 出版单位信息
export const QUERY_SUPPLIER_INFO = query => req('post', '/query/supplier/info', query);
// 出版单位品种排行
export const QUERY_SUPPLIER_GOODSRANK = query => req('post', '/query/supplier/goodsrank', query);
// 出版单位类目排行
export const QUERY_SUPPLIER_CATERANK = query => req('post', '/query/supplier/caterank', query);
// 出版单位读者画像
export const QUERY_SUPPLIER_READER = query => req('post', '/query/supplier/reader', query);
// 出版单位核心数据
export const QUERY_SUPPLIER_KERNELDATA = query => req('post', '/query/supplier/kerneldata', query);
// 出版单位核心数据图形
export const QUERY_SUPPLIER_KERNELCHART = query => req('post', '/query/supplier/kernelchart', query);
// 全品种销售排行
export const QUERY_GOODS_SALE = query => req('post', '/query/goods/sale', query);
// 全品种涨幅排行
export const QUERY_GOODS_INCR = query => req('post', '/query/goods/incr', query);
// 新品排行
export const QUERY_GOODS_GOODSNEW = query => req('post', '/query/goods/goodsnew', query);
// 页面访问数据
export const VISITDAT = query => req('post', '/visitdata/page', query);