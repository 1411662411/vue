import http from './public';
// 新建shoppings
export const login = (params) => {
    return http.doPost(http.baseUrl + 'shop/login', params);
}