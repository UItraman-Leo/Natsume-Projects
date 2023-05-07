import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        // 用来记录第一次进入路由的状态
        isGetterRouter: false,
        // 用来记录侧边栏是否水平折叠收起菜单
        isCollapse: true,
        // 用来存储用户信息
        userInfo: {},
    },
    getters: {},
    mutations: {
        changeGetterRouter(state, value) {
            state.isGetterRouter = value
        },
        changeCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
        changeUserInfo(state, value) {
            state.userInfo = {
                ...state.userInfo,
                ...value
            }
        },
        clearUserInfo(state, value) {
            state.userInfo = {}
        },
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState({
        paths: ["isCollapse", "userInfo"] //控制哪些状态要持久化
    })],
})
