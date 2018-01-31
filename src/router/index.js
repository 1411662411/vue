import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
        // mode: 'history',
        hashbang: true,
        linkActiveClass: 'active',
        routes: [{
                path: '/',
                redirect: '/login',
                name: 'home',
                component: resolve => require(['@/components/Login.vue'], resolve)
            },
            {
                path: '/login',
                name: 'login',
                component: resolve => require(['@/components/Login.vue'], resolve)
            },
            {
                path: '/accountsetting',
                name: 'accountsetting',
                component: resolve => require(['@/components/account/AccountSetting.vue'], resolve)
            },
            {
                path: '/shopping',
                name: 'shopping',
                redirect: '/shopping/shoppinglist',
                component: resolve => require(['@/components/shoppings/Shopping.vue'], resolve),
                children: [{
                        path: 'shoppinglist',
                        name: 'shoppinglist',
                        meta: {
                            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        },
                        component: resolve => require(['@/components/shoppings/ShoppingList.vue'], resolve)
                    },
                    {
                        path: 'shoppingadd/:shoppingId',
                        name: 'shoppingadd',
                        component: resolve => require(['@/components/shoppings/ShoppingAdd.vue'], resolve)
                    },
                    {
                        path: 'shoppingcate',
                        name: 'shoppingcate',
                        component: resolve => require(['@/components/shoppings/ShoppingCate.vue'], resolve)
                    }
                ]
            },
            {
                path: '/count',
                name: 'count',
                redirect: '/count/countachieve',
                component: resolve => require(['@/components/counts/Count.vue'], resolve),
                children: [{
                        path: 'countachieve',
                        name: 'countachieve',
                        component: resolve => require(['@/components/counts/CountAchieve.vue'], resolve)
                    },
                    {
                        path: 'countachieve/:id',
                        name: 'countmanagerdetail',
                        component: resolve => require(['@/components/counts/CountManagerDetail.vue'], resolve)
                    },
                    {
                        path: 'countachieve/:id/:ids',
                        name: 'countsaledetail',
                        component: resolve => require(['@/components/counts/CountSaleDetail.vue'], resolve)
                    },
                    {
                        path: 'countshopping',
                        name: 'countshopping',
                        component: resolve => require(['@/components/counts/CountShopping.vue'], resolve)
                    }
                ]
            },
            {
                path: '/marketing',
                name: 'marketing',
                redirect: '/marketing/manjian',
                component: resolve => require(['@/components/marketings/Marketing.vue'], resolve),
                children: [{
                        path: 'limitlist',
                        name: 'limitlist',
                        component: resolve => require(['@/components/marketings/MarketingLimitList.vue'], resolve)
                    },
                    {
                        path: 'manjian',
                        name: 'manjian',
                        component: resolve => require(['@/components/marketings/MarketingManJian.vue'], resolve)
                    },
                    {
                        path: 'needslist',
                        name: 'needslist',
                        component: resolve => require(['@/components/marketings/MarketingNeedsList.vue'], resolve)
                    },
                    {
                        path: 'red',
                        name: 'red',
                        component: resolve => require(['@/components/marketings/MarketingRed.vue'], resolve)
                    }
                ]
            },
            {
                path: '/member',
                name: 'member',
                redirect: '/member/membermanager',
                component: resolve => require(['@/components/members/Member.vue'], resolve),
                children: [{
                        path: 'membermanager',
                        name: 'membermanager',
                        component: resolve => require(['@/components/members/MemberManager.vue'], resolve)
                    },
                    {
                        path: 'memberadd',
                        name: 'memberadd',
                        component: resolve => require(['@/components/members/MemberAdd.vue'], resolve)
                    },
                    {
                        path: 'membermanager/:id',
                        name: 'memberedit',
                        component: resolve => require(['@/components/members/MemberEdit.vue'], resolve)
                    },
                    {
                        path: 'membermanager/:ids',
                        name: 'memberbranchdetail',
                        component: resolve => require(['@/components/members/MemberBranchDetail.vue'], resolve)
                    }
                ]
            },
            {
                path: '/order',
                name: 'order',
                redirect: '/order/orderlist',
                component: resolve => require(['@/components/orders/Order.vue'], resolve),
                children: [{
                        path: 'orderlist',
                        name: 'orderlist',
                        component: resolve => require(['@/components/orders/OrderList.vue'], resolve)
                    },
                    {
                        path: 'orderlist/:id',
                        name: 'orderdetail',
                        component: resolve => require(['@/components/orders/OrderDetail.vue'], resolve)
                    },
                    {
                        path: 'orderlogistics',
                        name: 'orderlogistics',
                        component: resolve => require(['@/components/orders/OrderLogistics.vue'], resolve)
                    },
                    {
                        path: 'orderfollow',
                        name: 'orderfollow',
                        component: resolve => require(['@/components/orders/OrderFollow.vue'], resolve)
                    },
                    {
                        path: 'orderrefund',
                        name: 'orderrefund',
                        component: resolve => require(['@/components/orders/OrderRefund.vue'], resolve)
                    },
                    {
                        path: 'orderrefund/:id',
                        name: 'orderrefunddetail',
                        component: resolve => require(['@/components/orders/OrderRefundDetail.vue'], resolve)
                    }
                ]
            },
            {
                path: '/setting',
                name: 'setting',
                redirect: '/setting/dialog',
                component: resolve => require(['@/components/settings/Setting.vue'], resolve),
                children: [{
                        path: 'dialog',
                        name: 'dialog',
                        component: resolve => require(['@/components/settings/SettingDialog.vue'], resolve)
                    },
                    {
                        path: 'search',
                        name: 'search',
                        component: resolve => require(['@/components/settings/SettingSearch.vue'], resolve)
                    },
                    {
                        path: 'banner',
                        name: 'banner',
                        component: resolve => require(['@/components/settings/SettingBanner.vue'], resolve),
                    },
                    {
                        path: 'addBanner/:bannerId',
                        name: 'addBanner',
                        component: resolve => require(['@/components/settings/addBanner.vue'], resolve)
                    },
                    {
                        path: 'filter',
                        name: 'filter',
                        component: resolve => require(['@/components/settings/SettingFilter.vue'], resolve)
                    },
                    {
                        path: 'logistics',
                        name: 'logistics',
                        component: resolve => require(['@/components/settings/SettingLogistics.vue'], resolve)
                    },
                    {
                        path: 'addLogistics/:logId',
                        name: 'addLogistics',
                        component: resolve => require(['@/components/settings/addLogistics.vue'], resolve)
                    },
                    {
                        path: 'menu',
                        name: 'menu',
                        component: resolve => require(['@/components/settings/SettingMenu.vue'], resolve)
                    },
                    {
                        path: 'addMenu/:menuId',
                        name: 'addMenu',
                        component: resolve => require(['@/components/settings/addMenu.vue'], resolve)
                    },
                    {
                        path: 'notice',
                        name: 'notice',
                        component: resolve => require(['@/components/settings/SettingNotice.vue'], resolve)
                    },
                    {
                        path: 'winpos',
                        name: 'winpos',
                        component: resolve => require(['@/components/settings/SettingWinPos.vue'], resolve)
                    },
                    {
                        path: 'addWinpos/:winPosId',
                        name: 'addWinpos',
                        component: resolve => require(['@/components/settings/addWinPos.vue'], resolve)
                    }
                ]
            },
            {
                path: '/user',
                name: 'user',
                redirect: '/user/userlist',
                component: resolve => require(['@/components/users/User.vue'], resolve),
                children: [{
                        path: 'userlist',
                        name: 'userlist',
                        component: resolve => require(['@/components/users/UserList.vue'], resolve)
                    },
                    {
                        path: 'userlist/:id', //根据用户的不同，有着不同的id作为区别
                        name: 'userdetail',
                        component: resolve => require(['@/components/users/UserDetail.vue'], resolve)
                    },
                    {
                        path: 'agentlist',
                        name: 'agentlist',
                        component: resolve => require(['@/components/users/AgentList.vue'], resolve)
                    },
                    {
                        path: 'agentlist/:id',
                        name: 'agentdetail',
                        component: resolve => require(['@/components/users/AgentDetail.vue'], resolve)
                    }
                ]
            }
        ]
    })
    // router.beforeEach((to, from, next) => {
    //   if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    //     if (store.state.token) { // 通过vuex state获取当前的token是否存在
    //       next();
    //     } else {
    //       next({
    //         path: '/login',
    //         query: {
    //           redirect: to.fullPath
    //         } // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //       })
    //     }
    //   } else {
    //     next();
    //   }
    // })
export default router;