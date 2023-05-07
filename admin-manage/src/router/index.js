import {createRouter, createWebHashHistory} from 'vue-router'
import Login from "@/views/Login.vue";
import MainBox from "@/views/MainBox.vue";
import routesConfig from "./config"
import store from "@/store";

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/mainbox",
        name: "mainbox",
        component: MainBox,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// 路由拦截，每次路由跳转之前先调用
router.beforeEach((to, from, next) => {
    if (to.name === "login") {
        // 如果跳转登录页面，直接跳转
        next()
    } else {
        //不是登录页需要判断是否授权，

        if (!localStorage.getItem("token")) {
            //如果未授权，重定向返回登录页面
            next({
                path: "/login"
            })
        } else {
            
            if (!store.state.isGetterRouter) {
                // 1.删除掉mainbox下的路由
                router.removeRoute('mainbox')
                // 如果授权才允许进入 next()
                ConfigRouter()
                // 子路由刚配置完不生效，所以需要重新进一次
                next({
                    path: to.fullPath
                })
            } else {
                next()
            }
        }
    }
})

const ConfigRouter = () => {
    // 2.判断是否有mainbox路由
    if (!router.hasRoute("mainbox")) {
        // 3.能进到这里表示没有mainbox这个路由，所以添加这个路由
        router.addRoute(
            {
                path: "/mainbox",
                name: "mainbox",
                component: MainBox,
            }
        )
    }

    routesConfig.forEach(item => {
        // 6.为true时才会执行后面这条
        checkmission(item) && router.addRoute("mainbox", item)
    })
// 改变 isGetterRouter 的状态值
    store.commit("changeGetterRouter", true)
}

const checkmission = (item) => {
    //4. 判断路由里是否有这个字段，有的则表示需要权限
    if (item.requireAdmin) {
        //5. 如果是管理员权限就return true
        return store.state.userInfo.role === '管理员'
    }
    return true
}
export default router
