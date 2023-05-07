import Home from "@/views/home/Home.vue";
import Center from "@/views/center/Center.vue";
import Useradd from "@/views/users-manage/UsersAdd.vue";
import UserList from "@/views/users-manage/UsersList.vue";
import ProductAdd from "@/views/product-manage/ProductAdd.vue";
import ProductList from "@/views/product-manage/ProductList.vue";
import NewList from "@/views/new-manage/NewList.vue";
import NewsAdd from "@/views/new-manage/NewsAdd.vue";
import NotFound from "@/views/not-found/NotFound.vue";

const routesConfig = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/center',
        component: Center
    },
    {
        path: '/user-manafe/useradd',
        component: Useradd,
        requireAdmin: true
    },
    {
        path: '/user-manafe/userlist',
        component: UserList,
        requireAdmin: true
    },
    {
        path: '/product-manafe/productadd',
        component: ProductAdd
    },
    {
        path: '/product-manafe/productlist',
        component: ProductList
    },
    {
        path: '/news-manafe/newadd',
        component: NewsAdd
    },
    {
        path: '/news-manafe/newlist',
        component: NewList
    },
    {
        path: '/',
        redirect: "/home"
    },
    {
        path: '/:pathMatch(.*)*',
        name: "NotFound",
        component: NotFound
    }

]
export default routesConfig