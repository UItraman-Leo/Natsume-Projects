<template>
  <el-header :style="{
    'background-image': navImg.topColor
  }">
    <div class="left">
      <el-icon :style="{
        'color':navImg.activeColor
      }" class="is-Grid" @click="clickCollapse">
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
            <ul @click="ToggleColors">
              <el-dropdown-item v-for="(item,index) in bgImg" :key="index" :data-index='index'>
                {{ item.name }}
            </el-dropdown-item>
            </ul>
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
import {Grid, Plus, CircleCheck} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {computed, reactive} from 'vue'
import colorArr from './color'

const router = useRouter()
const store = useStore()
// 点击切换菜单栏是否展开状态
const clickCollapse = () => {
  store.commit("changeCollapse")
}
const avatarUrl = computed(() =>
    store.state.userInfo.avatar ?
    `https://api.xia-mu.top:3000${store.state.userInfo.avatar}` :
        "http://pic-cloud.xia-mu.top/img/wallpapers/1689584007_580e9129648659b5ef1b5dad9081645d.jpg")
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

// 切换颜色
const bgImg = reactive(colorArr)
const ToggleColors = (e) => {
  store.commit("changeColorTheme", e.target.dataset.index)
  console.log(store.state.ColorTheme)
}
const navImg = computed(() => {
  return bgImg[store.state.ColorTheme]
})
</script>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  padding: 0;
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