<template>
  <el-header>
    <div class="left">
      <el-icon class="is-Grid" @click="clickCollapse">
        <Grid/>
      </el-icon>
<!--      <span>????后台管理</span>-->
    </div>
    <div class="right">
      <span>{{ store.state.userInfo.nickname }}</span>
      <el-dropdown trigger="click">
        <div class="user">
          <el-avatar :size="50" :src="avatarUrl"/>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="Plus" @click="clickCenter">
              个人中心
            </el-dropdown-item>
            <el-dropdown-item :icon="CirclePlusFilled">
              啥也没有
            </el-dropdown-item>
            <el-dropdown-item :icon="CirclePlus">
              啥也没有
            </el-dropdown-item>
            <el-dropdown-item :icon="Check">
              啥也没有
            </el-dropdown-item>
            <el-dropdown-item :icon="CircleCheck" @click="clickQuit">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </el-header>

</template>

<script setup>
import {useStore} from 'vuex'
import {Grid, Plus, CirclePlusFilled, CirclePlus, Check, CircleCheck} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {computed} from 'vue'

const router = useRouter()
const store = useStore()
// 点击切换菜单栏是否展开状态
const clickCollapse = () => {
  store.commit("changeCollapse")
}
const avatarUrl = computed(() =>
    store.state.userInfo.avatar ?
        `http://localhost:3000${store.state.userInfo.avatar}` :
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")
// 右侧下拉内容
// 1.个人中心
const clickCenter = () => {
  router.push("/center")
}
// 2.退出
const clickQuit = () => {
  // 后续做清除token
  localStorage.removeItem("token")
  // 清空用户数据
  store.commit('clearUserInfo')
  router.push("/login")
}

// 右侧下拉内容
</script>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  padding: 0;
  background-color: #94efd8;
  display: flex;

  .left {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;

    .is-Grid {
      color: yellow;
      font-size: 3rem;
      transition-duration: 500ms;
      cursor: pointer;
    }

    .is-Grid:hover {
      transition-duration: 500ms;
      transform: rotateZ(135deg);
    }

    span {
      padding-left: 20px;
    }
  }

  .right {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;

    .user {
      width: 50px;
      height: 50px;
      margin: 0 10px 0 30px;;
    }
  }

}

</style>