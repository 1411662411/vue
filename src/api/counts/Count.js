import http from '../public';
//统计详情
export const index = (params) => {
    return http.fetchGet(http.baseUrl + 'static/index', params);
}

//每月统计详情
export const detail = (params) => {
    return http.fetchGet(http.baseUrl + 'static/detail', params);
}

//项目经理每月统计详情
export const managerDetail = (params) => {
    return http.fetchGet(http.baseUrl + 'static/manager-detail', params);
}

//商品统计
export const good = (params) => {
    return http.fetchGet(http.baseUrl + 'static/good', params);
}