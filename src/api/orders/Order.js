import http from '../public';
//获取列表
export const orderList = (params) => {
    return http.fetchGet(http.baseUrl + 'order/order-list', params);
}

//获取数量
export const orderMap = (params) => {
    return http.fetchGet(http.baseUrl + 'order/order-map', params);
}

//订单详情
export const orderDetail = (params) => {
    return http.fetchGet(http.baseUrl + 'order/order-detail', params);
}

//发快递
export const express = (params) => {
    return http.fetchPost(http.baseUrl + 'order/express', params);
}

//获取快递公司
export const ship = (params) => {
    return http.fetchGet(http.baseUrl + 'order/ship', params);
}

//修改收货人信息
export const editAddress = (params) => {
    return http.fetchPost(http.baseUrl + 'order/edit-address', params);
}

//订单跟踪
export const track = (params) => {
    return http.fetchGet(http.baseUrl + 'order/track', params);
}

//关闭订单
export const delOrder = (params) => {
    return http.fetchPost(http.baseUrl + 'order/del-order', params);
}

//退款列表
export const refundList = (params) => {
    return http.fetchGet(http.baseUrl + 'order/refund-list', params);
}

//退款统计
export const refundMap = (params) => {
    return http.fetchGet(http.baseUrl + 'order/refund-map', params);
}

//退款详情
export const refundDetail = (params) => {
    return http.fetchGet(http.baseUrl + 'order/refund-detail', params);
}

//退款
export const refund = (params) => {
    return http.fetchPost(http.baseUrl + 'order/refund', params);
}

//拒绝退款
export const refuseRefund = (params) => {
    return http.fetchPost(http.baseUrl + 'order/refuse-refund', params);
}