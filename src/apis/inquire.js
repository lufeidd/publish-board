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
