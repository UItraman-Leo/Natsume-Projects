<template>
  <el-aside :style="{
    'background-image': navImg.leftColor
  }" width="{{$store.state.isCollapse?63:200}}px">
    <el-menu
        :active-text-color=navImg.activeColor
        :default-openeds="opends"
        :collapse="$store.state.isCollapse"
        :default-active="route.fullPath"
        :router="true"
        background-color="#c6f1e600"
        mode="vertical"
        class="el-menu"
        text-color="#111"
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
        <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>
      <!--      文章管理-->
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon>
            <Management/>
          </el-icon>
          <span>文章管理</span>
        </template>
        <el-menu-item index="/news-manage/newadd">创建文章</el-menu-item>
        <el-menu-item index="/news-manage/newlist">文章列表</el-menu-item>
      </el-sub-menu>
      <!--      导航管理-->
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>导航管理</span>
        </template>
        <el-menu-item index="/product-manage/productadd">添加导航</el-menu-item>
        <el-menu-item index="/product-manage/productlist">导航列表</el-menu-item>
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
import {computed, reactive} from "vue";
import colorArr from "@/components/maibox/color";

const store = useStore()
const route = useRoute()
const vAdmin = {
  mounted(el) {
    if (store.state.userInfo.role === 1) {
      el.parentNode.removeChild(el)
    }
  }
}
const opends = reactive(["/user-manage", "/news-manage", "/product-manage"])
// 修改颜色
const bgImg = reactive(colorArr)
const navImg = computed(() => {
  return bgImg[store.state.ColorTheme]
})
</script>

<style lang="scss" scoped>
.el-aside {
  .el-menu{
    border: solid 0
  }
}


</style>