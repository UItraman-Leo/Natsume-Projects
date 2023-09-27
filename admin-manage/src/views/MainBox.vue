<template>
  <div class="common-layout">
    <el-container direction="vertical">
      <!-- 头部-->
      <TopHeader></TopHeader>
      <el-container style="height: 100vh">
        <!-- 侧边栏-->
        <LeftAside></LeftAside>
        <!--内容区-->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import TopHeader from "@/components/maibox/Top-Header.vue";
import LeftAside from "@/components/maibox/Left-Aside.vue";
</script>

<style lang="scss" scoped>
.common-layout {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

//.el-main{
//  background-attachment: fixed;
//  background-repeat: no-repeat;
//  background-size: cover;
//  background-image:url("http://pic-cloud.xia-mu.top/img/wallpapers/1689584007_e94e64579b68f246f160c42cb298c389.jpg");
//}
</style>