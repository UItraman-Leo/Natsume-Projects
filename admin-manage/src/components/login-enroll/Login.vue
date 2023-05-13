<template>
  <div class="Login">
    <div class="title">
        <p>登录</p>
    </div>
    <el-form
        ref="LoginFormRef"
        :model="LoginForm"
        :rules="LoginFormRules"
        class="LoginForm"
        label-width="auto"
        status-icon
    >
      <el-form-item prop="username">
        <el-input
            placeholder="账号"
            v-model="LoginForm.username"
            autocomplete="off"
            type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
            placeholder="密码"
            v-model="LoginForm.password"
            autocomplete="off"
            type="password"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" round :disabled="disabled" size="100px" @click="submitForm(LoginFormRef)">
          登录
        </el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'
import {ElMessage} from 'element-plus'
import store from "@/store";

const router = useRouter()
const LoginFormRef = ref() //表单的引用对象
const LoginForm = reactive({//表单绑定的响应式对象
  username: "",
  password: ""
})
const LoginFormRules = reactive({
  username: [
    {required: true, message: '请输入用户名'},
    {min: 1, max: 10, message: 'Length should be 1 to 10'},
  ],
  password: [
    {required: true, message: '请输入密码'},
  ]
})
const disabled = ref(false)
const submitForm = () => {
  disabled.value = true
//   点击登录事件
//   1.校验表单
  LoginFormRef.value.validate((valid) => {
    // console.log("dddd", valid)
    //   valid 如果为true表示账号密码验证通过，为false不通过
    if (valid) {
      //   2.1拿到表单数据提交后台
      // console.log("@@@", LoginForm.username, LoginForm.password)
      axios.post('/adminapi/user/login', LoginForm)
          .then(res => {
            // console.log("ok", res)
            if (res.data.ActionType === 'login-OK') {
              //2.2 将请求获取的个人信息存储到vuex
              store.commit('changeUserInfo', res.data.data)
              // 每次点击登录的时候都把路由状态改为false
              store.commit("changeGetterRouter", false)
              // 2.3 跳转路由
              router.push('/')
              // 清除表单
              LoginFormRef.value.resetFields()
            } else {
              ElMessage({
                showClose: false,
                message: '用户名或密码不正确',
                type: 'error',
              })
            }
          })
    }
  })
  setTimeout(()=>{
    disabled.value = false
  },2000)
}


</script>


<style lang="scss" scoped>
//登录
.Login {
  position:relative;
  //标题
  .title{
    width: 100%;
    height: 100px;
    background: 120px 0 url("https://i.postimg.cc/8ChzHzM0/aigei-com.gif") no-repeat;
    //margin-top: 6px;
    p{
      font-family: cursive;
      font-size: 3.5em;
      font-weight: bold;
      text-align:center;
    }
  }
  //表单
  .LoginForm {
    padding: 0;
    .el-input{
      margin: 10px;
    }
    .el-button{
      width: 100%;
      margin: 14px 50px 14px 50px;
    }
  }
}



::v-deep( .el-form-item) {
  //样式穿透 ::v-deep
  //margin-bottom: 20px;

}
</style>