<template>
  <div id="app">
    <div class="lg-box">
      <Login/>
      <!-- <Enroll /> -->
    </div>
  </div>
</template>

<script setup >
import Enroll from "@/components/login-enroll/Enroll.vue";
import Login from "@/components/login-enroll/Login.vue";
import {ref,onMounted} from 'vue'


</script>


<style lang="scss" scoped>
$ruler: 16px;
$color-red: #ae1100;
$color-bg: #ebecf0;
$color-shadow: #babecc;
$color-white: #fff;
#app{
  width: 100vw;
  height: 100vh;
  background-color: $color-bg;
  display: flex;
}

.lg-box {
  width: $ruler*20;
  height: $ruler*30;
  background: pink;
  margin: auto;
}

</style>