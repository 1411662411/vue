export default {
    checkStt: ({ commit }, payload) => {
        setTimeout(() => {
            commit('checkStt', payload);
        }, 1000)
    },
    checkTIndex: ({ commit }, payload) => {
        commit('checkTIndex', payload)
    },
    checkCountsIndex: ({ commit }, payload) => {
        commit('checkCountsIndex', payload)
    },
    checkMarketingsIndex: ({ commit }, payload) => {
        commit('checkMarketingsIndex', payload)
    },
    checkMembersIndex: ({ commit }, payload) => {
        commit('checkMembersIndex', payload)
    },
    checkOrdersIndex: ({ commit }, payload) => {
        commit('checkOrdersIndex', payload)
    },
    checkSettingsIndex: ({ commit }, payload) => {
        commit('checkSettingsIndex', payload)
    },
    checkShoppingsIndex: ({ commit }, payload) => {
        commit('checkShoppingsIndex', payload)
    },
    checkUsersIndex: ({ commit }, payload) => {
        commit('checkUsersIndex', payload)
    },
    checkOrder_sn: ({ commit }, payload) => {
        commit('checkOrder_sn', payload)
    },
    checkBstop: ({ commit }, payload) => {
        commit('checkBstop', payload)
    },
    checkToken: ({ commit }, payload) => {
        commit('checkToken', payload)
    }
}