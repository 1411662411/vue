import axios from 'axios'
import router from '../router'
import qs from 'qs'
import store from '../store/index'

// axios.defaults.headers.post['content-type'] = 'application/x-www=form-urlencoded'
const baseUrl = 'https://api.jiuwanjia.com/api/admin/';

axios.interceptors.request.use(config => {
    // loading
    if (store.state.token) {
        config.headers.Authorization = `token ${store.state.token}`;
    }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    if (response.data.code == 1) {
        console.log(response.data.message);
    }
    if (response.data.code == 2) {
        localStorage.removeItem('data');
        router.replace({
            path: '/login',
        })
    }
    return response
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 401 清除token信息并跳转到登录页面
                store.commit(types.LOGOUT);
                router.replace({
                    path: 'login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                })
        }
    }
    return Promise.resolve(error.response)
})

const instance = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
const instanceUpload = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export default {
    baseUrl,
    fetchGet(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    fetchPost(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    doGet(url, data) {
        return new Promise((resolve, reject) => {
            instance({
                method: 'get',
                url: 'https://api.jiuwanjia.com/api/admin/' + url,
                data: qs.stringify(data)
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            });
        })
    },
    doPost(url, data) {
        return new Promise((resolve, reject) => {
            instance({
                method: 'post',
                url: url,
                data: qs.stringify(data)
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            });
        })
    },

    // doUpLoadFile(url, data) {
    //   return new Promise((resolve, reject) => {
    //     instanceUpload({
    //       method: 'post',
    //       url: url,
    //       data: qs.stringify(data)
    //     }).then(res => {
    //       resolve(res.data)
    //     }).catch(error => {
    //       reject(error)
    //     });
    //   })
    // }
}