import http from '../public';
//获取项目经理
export const managerList = (params) => {
    return http.fetchGet(http.baseUrl + 'manager/manager-list', params);
}

//添加项目经理
export const addManager = (params) => {
    return http.fetchPost(http.baseUrl + 'manager/add-manager', params);
}

//编辑项目经理
export const editManager = (params) => {
    return http.fetchPost(http.baseUrl + 'manager/edit-manager', params);
}

//项目经理账户信息
export const managerInfo = (params) => {
    return http.fetchGet(http.baseUrl + 'manager/manager-info', params);
}

//项目经理详情
export const managerDetail = (params) => {
    return http.fetchGet(http.baseUrl + 'manager/manager-detail', params);
}

//删除项目经理
export const delManager = (params) => {
    return http.fetchPost(http.baseUrl + 'manager/del-manager', params);
}