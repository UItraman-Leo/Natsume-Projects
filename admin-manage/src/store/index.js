import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        // 用来记录第一次进入路由的状态
        isGetterRouter: false,
        // 用来记录侧边栏是否水平折叠收起菜单
        isCollapse: false,
        // 用来存储用户信息
        userInfo: {},
        //记录选用的颜色主题
        ColorTheme: 0
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
            // console.log(state,value)
            state.userInfo = {
                ...state.userInfo,
                ...value
            }
        },
        clearUserInfo(state) {
            state.userInfo = {}
        },
        changeColorTheme(state, value) {
            state.ColorTheme = value
            // console.log('vuex',state, value)
        }
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState({
        paths: ["ColorTheme", "isCollapse", "userInfo"] //控制哪些状态要持久化
    })],
})
