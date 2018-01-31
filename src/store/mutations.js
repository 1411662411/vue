export default {
    checkStt: (state, payload) => {
        state.stt = payload
    },
    checkTIndex: (state, payload) => {
        state.tindex = payload
    },
    checkCountsIndex: (state, payload) => {
        state.countsindex = payload
    },
    checkMarketingsIndex: (state, payload) => {
        state.marketingsindex = payload
    },
    checkMembersIndex: (state, payload) => {
        state.membersindex = payload
    },
    checkOrdersIndex: (state, payload) => {
        state.ordersindex = payload
    },
    checkSettingsIndex: (state, payload) => {
        state.settingsindex = payload
    },
    checkShoppingsIndex: (state, payload) => {
        state.shoppingsindex = payload
    },
    checkUsersIndex: (state, payload) => {
        state.usersindex = payload
    },
    login: (state, data) => {
        localStorage.token = data;
        state.token = data;
    },
    logout: (state) => {
        localStorage.removeItem('token');
        state.token = null
    },
    title: (state, data) => {
        state.title = data;
    },
    tooLogin: (state, payload) => {
        state.toLogin = payload;
    },
    checkFullscreenLoading: (state, payload) => { //营销懒加载
        state.fullscreenLoadings = payload;
    },
    checkFullscreenLoading1: (state, payload) => { //统计懒加载
        state.fullscreenLoadings1 = payload;
    },
    checkFullscreenLoading2: (state, payload) => { //成员懒加载
        state.fullscreenLoadings2 = payload;
    },
    checkFullscreenLoading3: (state, payload) => { //订单懒加载
        state.fullscreenLoadings3 = payload;
    },
    checkFullscreenLoading4: (state, payload) => { //设置懒加载
        state.fullscreenLoadings4 = payload;
    },
    checkFullscreenLoading5: (state, payload) => { //商品懒加载
        state.fullscreenLoadings5 = payload;
    },
    checkFullscreenLoading6: (state, payload) => { //用户懒加载
        state.fullscreenLoadings6 = payload;
    },
    checkOrder_sn: (state, payload) => { //订单编号
        state.order_sn = payload;
    },
    checkBstop: (state, payload) => { //订单编号
        state.bstop = payload;
    },
    checkToken: (state, payload) => { //登录的token
        if (state.token == null) {
            state.token = localStorage.getItem('data')
        } else {
            state.token = payload;
        }
    }
}