<script setup>
import Enroll from "@/components/login-enroll/Enroll.vue";
import Login from "@/components/login-enroll/Login.vue";
import {ref, onMounted} from 'vue'

const handoff = ref(true)
const handelClick = (e) => {
  handoff.value = e
}

</script>
<template>
  <div id="app">
    <!--    头部文字-->
    <div class="title">
      <p>{{ handoff ? 'Login' : 'Registered' }}</p>
    </div>
    <!--   登录-注册-说明区域 -->
    <div class="Login-Enroll-Illustrate">
      <!--      登录-注册-->
      <div class="lg-box">
        <div :class="{ active: !handoff }" class="lg-big-box">
          <Login style="width: 50%"/>
          <Enroll style="width: 50%"/>
        </div>
      </div>
      <!--      说明区域-->
      <div class="Illustrate">
        <div>
          <ul>
            <li>账号1:test123456</li>
            <li>密码:test123456</li>
            <li>账号2:test654321</li>
            <li>密码:test654321</li>
          </ul>
        </div>
        <div>
          <button @click="handelClick(true)">登录</button>
          <button @click="handelClick(false)">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$ruler: 16px;
$color-white: #fff;
$color-red: #ae1100;
$color-bg: #ebecf0;
$color-text: rgba(246, 240, 217, 0.89);
$color-title: #ebecf0;
$color-shadow: #ebecf0;
$color-to-title: #ebecf0;
$color-to-shadow: #c1fcf3;
#app{
  width: 100vw;
  height: 100vh;
  background-color: $color-bg;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}

//头部文字
.title {
  position: absolute;
  font-family: "Lobster";
  font-size: 3.5em;
  font-weight: bold;
  text-align: center;
  filter: brightness(110%);
  color: $color-text;
  text-shadow: 0 0 5px $color-shadow,
  0 0 10px $color-shadow,
  0 0 15px $color-shadow,
  0 0 20px $color-title,
  0 0 35px $color-title,
  0 0 40px $color-title,
  0 0 50px $color-title,
  0 0 75px $color-title;
  animation: title 1.5s ease-in-out infinite alternate;
}

//头部文字动画
@keyframes title {
  to {
    text-shadow: 0 0 10px $color-to-shadow,
    0 0 20px $color-to-shadow,
    0 0 30px $color-to-shadow,
    0 0 40px $color-to-title,
    0 0 70px $color-to-title,
    0 0 80px $color-to-title,
    0 0 100px $color-to-title,
    0 0 150px $color-to-title;
  }
}

//登录-注册-说明区域
.Login-Enroll-Illustrate {
  width: $ruler*40;
  height: $ruler*30;
  overflow: hidden;
  margin: auto;
  position: relative;
  display: flex;
  background: $color-bg;
}

//登录-注册区域
.lg-box {
  width: $ruler*20;
  height: $ruler*30;
  overflow: hidden;
  position: relative;

  .lg-big-box {
    position: absolute;
    display: flex;
    width: $ruler*20*2;
    height: $ruler*30;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    transform: translateX($ruler*0);
    transition: all 1s ease-out;
  }

  .active {
    transform: translateX(-$ruler*20);
    transition: all 1s ease-out;
  }
}

//说明区域
.Illustrate {
  position: relative;
  width: $ruler*20;
  height: $ruler*30;

  & > div:first-child {
    width: 100%;
    height: 60%;
    color: #c1c1c9;
    padding: 0 35%;

    & > ul {
      position: absolute;
      top: 100px;

      li {
        height: 30px;
        list-style: none;
      }
    }
  }

  & > div:last-child {
    width: 100%;
    height: 40%;
    display: flex;

    button {
      border: 0;
      font-size: $ruler;
      border-radius: $ruler * 20;
      padding: $ruler;
      background-color: $color-bg;
      text-shadow: 1px 1px 0 $color-white;
      color: #61677c;
      box-shadow: -5px -5px 20px $color-white, 5px 5px 20px $color-shadow;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      font-weight: 600;
      display: block;
      width: 4*$ruler;
      height: 4*$ruler;
      margin: auto;
      line-height: $ruler;
      color: $color-red;

      &:hover {
        box-shadow: -2px -2px 5px $color-white, 2px 2px 5px $color-shadow;
      }

      &:active {
        box-shadow: inset 1px 1px 2px $color-shadow,
        inset -1px -1px 2px $color-white;
      }
    }
}

}
</style>