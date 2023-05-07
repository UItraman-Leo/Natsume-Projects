<template>
  <el-aside width="{{$store.state.isCollapse?63:200}}px">
    <el-menu
        :collapse="$store.state.isCollapse"
        :default-active="route.fullPath"
        :router="true"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu"
        text-color="#fff"
    >
      <!--      主页-->
      <el-menu-item index="/home">
        <el-icon>
          <HomeFilled/>
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <!--      个人中心-->
      <el-menu-item index="/center">
        <el-icon>
          <User/>
        </el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <!--      用户管理-->
      <el-sub-menu v-admin index="/user-manage">
        <template #title>
          <el-icon>
            <Avatar/>
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manafe/useradd">添加用户</el-menu-item>
        <el-menu-item index="/user-manafe/userlist">用户列表</el-menu-item>
      </el-sub-menu>
      <!--      文章管理-->
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon>
            <Management/>
          </el-icon>
          <span>文章管理</span>
        </template>
        <el-menu-item index="/news-manafe/newadd">创建文章</el-menu-item>
        <el-menu-item index="/news-manafe/newlist">文章列表</el-menu-item>
      </el-sub-menu>
      <!--      产品管理-->
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product-manafe/productadd">添加产品</el-menu-item>
        <el-menu-item index="/product-manafe/productlist">产品列表</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import {
  HomeFilled,
  User,
  Avatar,
  Management,
  Menu as IconMenu,
} from '@element-plus/icons-vue';
import {useRoute} from 'vue-router'
import {useStore} from "vuex";

const store = useStore()
const route = useRoute()
const vAdmin = {
  mounted(el) {
    if (store.state.userInfo.role !== '管理员') {
      el.parentNode.removeChild(el)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #545c64;

  .el-menu {
    border: solid 0px
  }
}


</style>