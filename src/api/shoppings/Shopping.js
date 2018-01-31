import http from '../public';
//  获取商品分类
export const goodCate = (params) => {
        return http.fetchGet(http.baseUrl + 'shop/good-cate', params);
    }
    // 商品分类添加一级分类
export const addCate = (params) => {
        return http.fetchPost(http.baseUrl + 'shop/add-cate', params);
    }
    // 商品分类删除一级或者二级分类
export const delCate = (params) => {
        return http.fetchPost(http.baseUrl + 'shop/del-cate ', params);
    }
    // 商品分类添加二级分类
export const addTwoCate = (params) => {
        return http.fetchPost(http.baseUrl + 'shop/add-cate', params);
    }
    // 商品分类编辑一级或者二级分类
export const editCate = (params) => {
        return http.fetchPost(http.baseUrl + 'shop/edit-cate', params);
    }
    // 商品详情
export const goodDetail = (params) => {
        return http.fetchGet(http.baseUrl + 'shop/good-detail', params);
    }
    // 商品列表
export const goodList = (params) => {
        return http.fetchGet(http.baseUrl + 'shop/good-list', params);
    }
    //  上下架商品
export const downGood = (params) => {
        return http.fetchPost(http.baseUrl + 'shop/down-good', params);
    }
    // 是否热卖
export const hotGood = (params) => {
        return http.fetchPost(http.baseUrl + 'shop/hot-good', params);
    }
    // 删除商品
export const delGood = (params) => {
        return http.fetchPost(http.baseUrl + 'shop/del-good', params);
    }
    //  修改商品详情
export const editGood = (params) => {
        return http.fetchPost(http.baseUrl + 'shop/edit-good', params);
    }
    // 添加商品
export const addGood = (params) => {
        return http.fetchPost(http.baseUrl + 'shop/add-good', params);
    }
    //获取产地
export const getPlace = (params) => {
        return http.fetchGet(http.baseUrl + 'state/place-screen', params);
    }
    //获取套餐组合
export const composer = (params) => {
    return http.fetchGet(http.baseUrl + 'market/composer', params);
}

//添加到秒杀商品
export const addSpikeGood = (params) => {
    return http.fetchPost(http.baseUrl + 'shop/add-spike-good', params);
}

//从秒杀商品中移除
export const cancelSpikeGood = (params) => {
    return http.fetchPost(http.baseUrl + 'shop/cancel-spike-good', params);
}

//是否参加优惠
export const discount = (params) => {
    return http.fetchPost(http.baseUrl + 'shop/discount', params);
}