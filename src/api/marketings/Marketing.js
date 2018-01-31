import http from '../public';
//增加满减
export const addFull = (params) => {
    return http.fetchPost(http.baseUrl + 'market/add-full', params);
}

//获取所有满减
export const fullList = (params) => {
    return http.fetchGet(http.baseUrl + 'market/full-list', params);
}

//删除满减
export const delList = (params) => {
    return http.fetchPost(http.baseUrl + 'market/del-full', params);
}

//编辑满减
export const editFull = (params) => {
    return http.fetchPost(http.baseUrl + 'market/edit-full', params);
}

//获取秒杀活动
export const spike = (params) => {
    return http.fetchGet(http.baseUrl + 'market/spike', params);
}

//添加秒杀活动
export const addSpike = (params) => {
    return http.fetchPost(http.baseUrl + 'market/add-spike', params);
}

//删除秒杀活动
export const delSpike = (params) => {
    return http.fetchPost(http.baseUrl + 'market/del-spike', params);
}

//编辑秒杀活动
export const editSpike = (params) => {
    return http.fetchPost(http.baseUrl + 'market/edit-spike', params);
}

//上下线秒杀活动
export const downSpike = (params) => {
    return http.fetchPost(http.baseUrl + 'market/down-spike', params);
}

//获取套餐组合
export const composer = (params) => {
    return http.fetchGet(http.baseUrl + 'market/composer', params);
}

//添加套餐组合
export const addComposer = (params) => {
    return http.fetchPost(http.baseUrl + 'market/add-composer', params);
}

//删除套餐组合
export const delComposer = (params) => {
    return http.fetchPost(http.baseUrl + 'market/del-composer', params);
}

//编辑套餐组合
export const editComposer = (params) => {
    return http.fetchPost(http.baseUrl + 'market/edit-composer', params);
}

//上下线套餐
export const downComposer = (params) => {
    return http.fetchPost(http.baseUrl + 'market/down-composer', params);
}

//添加新客立减（红包）
export const addRed = (params) => {
    return http.fetchPost(http.baseUrl + 'market/edit-red', params);
}

//获取新客立减红包
export const getRed = (params) => {
    return http.fetchGet(http.baseUrl + 'market/get-red', params);
}