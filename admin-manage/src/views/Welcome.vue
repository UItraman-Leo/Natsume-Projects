<template>
<div class="appBg">
</div>
  <div id="app">
    <el-row :gutter="0">
      <el-col :span="17">
        <div class="exhibition">
            <div class="dailyWord">
              <p>大师傅士大夫士大夫撒旦反反复复烦烦烦烦烦烦烦烦烦烦噢噢噢噢噢噢噢噢噢噢噢噢哦哦哦烦烦烦烦烦是</p>
            </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="loginRegister">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item  name="1">
              <template #title>
                <p>Login</p>
              </template>
              <Login/>
            </el-collapse-item>
            <el-collapse-item  name="2">
              <template #title>
                <p>Enroll</p>
              </template>
              <Enroll  @content="contentChange"/>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Enroll from "@/components/login-enroll/Enroll.vue";
import Login from "@/components/login-enroll/Login.vue";
import {ref} from 'vue'

// 左侧每日一言和图片


// 手风琴展开状态
const activeName = ref('1')
const contentChange = (res)=>{
  // 注册成功后子组件传递 “1” 改变 activeName 的状态，切换到登录页
  activeName.value = res
}
</script>


<style lang="scss" scoped>
.appBg{
  position:absolute;
  height: 100%;
  width: 100%;
  background:0 0 url("@/assets/Welcome/background.png") no-repeat;
  background-size: cover;
}
#app{
  width: 1100px;
  height: 440px;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;

  .el-row{
    width: 100%;
    height:100%;
      //左侧
      .exhibition{
        min-height: 440px;
        border: 1px solid #545c64;
        background:url("@/assets/Welcome/bg.jpg");
        background-size: cover;
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-evenly;
        .dailyWord{
          width: 98%;
          max-height: 25em;
          writing-mode: vertical-rl;
          p{
            text-shadow:
                -1px -1px 1px #07fcf4,
            0px 4px 1px #2ec4bd,
            4px 4px 5px #1a817d,
            0px 0px 7px #04fca5;
            line-height: 30px;
            font-family: cursive;
            font-size: 1.3em;
          }
        }
      }
      //右侧
      .loginRegister{
        min-height: 440px;
        border: 1px solid #545c64;
        border-left: 0;
        .el-collapse{
          border:0;
          ::v-deep( .el-collapse-item__header){
            background-image: linear-gradient(90deg, #009f87, #7db097, #c0bfa8, #ffccb9);
              p{
                margin: auto;
                text-shadow:
                    -1px -1px 1px #07fcf4,
                    0px 4px 1px #2ec4bd,
                    4px 4px 5px #1a817d,
                    0px 0px 7px #04fca5;
                line-height: 30px;
                font-family: serif;
                font-size: 1.3em;
              }
          }
          ::v-deep(.el-collapse-item__wrap){
            background: #94efd8;
            //background: 0px 2px url('@/assets/Welcome/loginEnroll.png') no-repeat;
          }


        }

      }

}

}


</style>