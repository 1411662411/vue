import http from '../public';
//代理商列表
export const agentList = (params) => {
    return http.fetchGet(http.baseUrl + 'user/agent-list', params);
}

//代理商详情
export const agentDetail = (params) => {
    return http.fetchGet(http.baseUrl + 'user/agent-detail', params);
}

//同意申请
export const agreeAgent = (params) => {
    return http.fetchPost(http.baseUrl + 'user/agree-agent', params);
}

//拒绝申请
export const refuseAgent = (params) => {
    return http.fetchPost(http.baseUrl + 'user/refuse-agent', params);
}

//业务员更改
export const saleChange = (params) => {
    return http.fetchPost(http.baseUrl + 'user/change-sale', params);
}

//业务员列表
export const saleList = (params) => {
    return http.fetchGet(http.baseUrl + 'user/sale-list', params);
}

//搜索用户昵称
export const searchUser = (params) => {
    return http.fetchGet(http.baseUrl + 'user/search-user', params);
}

//用户列表
export const userList = (params) => {
    return http.fetchGet(http.baseUrl + 'user/user-list', params);
}

//用户详情
export const userDetail = (params) => {
    return http.fetchGet(http.baseUrl + 'user/user-detail', params);
}

//一键申请为代理商
export const upGradeUser = (params) => {
    return http.fetchPost(http.baseUrl + 'user/upgrade-user', params);
}