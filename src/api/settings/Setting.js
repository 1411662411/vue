import http from '../public';
// 获取banner图列表信息
export const getBanners = (params) => {
        return http.fetchGet(http.baseUrl + 'state/banner', params);
    }
    // 设置banner图是否显示
export const toggle = (params) => {
        return http.fetchPost(http.baseUrl + 'state/block-banner', params);
    }
    // 删除banner
export const delBanner = (params) => {
        return http.fetchPost(http.baseUrl + 'state/del-banner', params);
    }
    // 获取banner详情
export const bannerDetail = (params) => {
        return http.fetchGet(http.baseUrl + 'state/banner-detail', params);
    }
    // 添加banner
export const addBanner = (params) => {
        return http.fetchPost(http.baseUrl + 'state/add-banner', params);
    }
    // 修改banner
export const editBanner = (params) => {
        return http.fetchPost(http.baseUrl + 'state/edit-banner', params);
    }
    // 修改公告
export const changeNotice = (params) => {
        return http.fetchPost(http.baseUrl + 'state/edit-notice', params);
    }
    //获取公告
export const getNotice = (params) => {
        return http.fetchGet(http.baseUrl + 'state/notice', params);
    }
    // 新建导航
export const menus = (params) => {
        return http.fetchGet(http.baseUrl + 'state/nav', params);
    }
    // 是否显示导航
export const blockNav = (params) => {
        return http.fetchPost(http.baseUrl + 'state/block-nav', params);
    }
    // 删除导航
export const delNav = (params) => {
        return http.fetchPost(http.baseUrl + 'state/del-nav', params);
    }
    // 导航详情
export const navDetail = (params) => {
        return http.fetchGet(http.baseUrl + 'state/nav-detail', params);
    }
    // 添加导航
export const addNav = (params) => {
        return http.fetchPost(http.baseUrl + 'state/add-nav', params);
    }
    // 修改导航
export const editNav = (params) => {
        return http.fetchPost(http.baseUrl + 'state/edit-nav', params);
    }
    // 获取橱窗列表

export const window = (params) => {
        return http.fetchGet(http.baseUrl + 'state/window', params);
    }
    // 获取橱窗详情
export const windowDetail = (params) => {
        return http.fetchGet(http.baseUrl + 'state/window-detail', params);
    }
    // 修改橱窗详情
export const editWindow = (params) => {
        return http.fetchPost(http.baseUrl + 'state/edit-window', params);
    }
    //产地筛选
export const placeScreen = (params) => {
        return http.fetchGet(http.baseUrl + 'state/place-screen', params);
    }
    // 价格筛选
export const priceScreen = (params) => {
        return http.fetchGet(http.baseUrl + 'state/price-screen', params);
    }
    // 添加产地
export const addPlace = (params) => {
        return http.fetchPost(http.baseUrl + 'state/add-place', params);
    }
    // 编辑产地
export const editPlace = (params) => {
        return http.fetchPost(http.baseUrl + 'state/edit-place', params);
    }
    // 删除产地
export const delPlace = (params) => {
        return http.fetchPost(http.baseUrl + 'state/del-place', params);
    }
    // 添加价格
export const addPrice = (params) => {
        return http.fetchPost(http.baseUrl + 'state/add-price', params);
    }
    //   编辑价格
export const editPrice = (params) => {
        return http.fetchPost(http.baseUrl + 'state/edit-price', params);
    }
    //删除价格
export const delPrice = (params) => {
        return http.fetchPost(http.baseUrl + 'state/del-price', params);
    }
    // 快递模板
export const logistics = (params) => {
        return http.fetchGet(http.baseUrl + 'state/logistics', params);
    }
    // 是否启用快递模板

export const blockLogistics = (params) => {
        return http.fetchPost(http.baseUrl + 'state/block-logistics', params);
    }
    // 删除快递模板
export const delLogistics = (params) => {
        return http.fetchPost(http.baseUrl + 'state/del-logistics', params);
    }
    // 快递模板详情
export const logisticsDetail = (params) => {
        return http.fetchGet(http.baseUrl + 'state/logistics-detail', params);
    }
    // 获取省份
export const getProvince = (params) => {
        return http.fetchGet(http.baseUrl + 'state/get-province', params);
    }
    // 编辑快递模板
export const editLogistics = (params) => {
        return http.fetchPost(http.baseUrl + 'state/edit-logistics', params);
    }
    // 添加快递模板
export const addLogistics = (params) => {
    return http.fetchPost(http.baseUrl + 'state/add-logistics', params);
}

//获取搜索信息
export const shopInfo = (params) => {
    return http.fetchGet(http.baseUrl + 'shop/shop-info', params);
}

//搜索关键字
export const search = (params) => {
    return http.fetchPost(http.baseUrl + 'state/search', params);
}

//获取弹框
export const push = (params) => {
    return http.fetchGet(http.baseUrl + 'state/push', params);
}

//更改弹框
export const editPush = (params) => {
    return http.fetchPost(http.baseUrl + 'state/edit-push', params);
}