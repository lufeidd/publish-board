import req from './http.js'
// 本社看板--综合概况
export const MYVIEW_PUBLISHERINFO = query => req('post', '/myview/supplierinfo', query);
// 本社看板--品种排行
export const MYVIEW_GOODSRANK = query => req('post', '/myview/goodsrank', query);
// 本社看板--地域排行
export const MYVIEW_REGIONRANK = query => req('post', '/myview/regionrank', query);
// 本社看板--核心数据
export const MYVIEW_KERNELDATA = query => req('post', '/myview/kerneldata', query);
// 本社看板--核心数据图形
export const MYVIEW_KERNELCHART = query => req('post', '/myview/kernelchart', query);

// 淘普100--商品排行
export const TOP_GOODSRANK = query => req('post', '/top/goodsrank', query);
// 淘普100--搜索历史
export const TOP_HISTORY = query => req('post', '/top/history', query);
// 淘普100--商品搜索
export const TOP_SEARCH = query => req('post', '/top/search', query);
// 淘普100--商品详情--商品信息
export const TOP_GOODS_INFO = query => req('post', '/top/goods/info', query);
// 淘普100--商品详情--销售走势核心数据
export const TOP_GOODS_KERNELDATA = query => req('post', '/top/goods/kerneldata', query);
// 淘普100--商品详情--生命周期基础数据
export const TOP_GOODS_HISTORY = query => req('post', '/top/goods/history', query);
// 淘普100--商品详情--生命周期核心数据
export const TOP_GOODS_HISTORYCHART = query => req('post', '/top/goods/historychart', query);
// 淘普100--商品详情--读者画像
export const TOP_GOODS_READER_BASE = query => req('post', '/top/goods/reader/base', query);
// 商品详情-关联商品
export const TOP_GOODS_RELATION = query => req('post', '/top/goods/relation', query);

// 核心类目
export const MYCATE_INDEX = query => req('post', '/mycate/index', query);
export const MYCATE_INDEX = query => req('post', '/mycate/index', query);


// 新品追踪
export const TRACE_NEWGOODS = query => req('post', '/trace/newgoods', query);

// 读者画像
export const READER_BASE = query => req('post', '/reader/base', query);


// 作者库
export const MYAUTHOR_LISTS = query => req('post', '/myauthor/lists', query);

// 地域排行
export const MYREGION_INDEX = query => req('post', '/myregion/index', query);
