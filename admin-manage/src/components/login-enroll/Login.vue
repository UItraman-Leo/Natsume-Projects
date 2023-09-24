<template>
  <div class="Login">
    <el-form
        ref="LoginFormRef"
        :model="LoginForm"
        :rules="LoginFormRules"
        class="LoginForm"
        label-width="auto"
        status-icon
        @keyup.enter.native="submitForm(LoginFormRef)"
    >
      <el-form-item prop="username">
        <el-input
            placeholder="Email Address"
            v-model.trim="LoginForm.username"
            autocomplete="off"
            type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
            placeholder="Password"
            v-model.trim="LoginForm.password"
            autocomplete="off"
            type="password"
        />
      </el-form-item>

      <el-form-item>
        <button type="button">
          <p @click="submitForm(LoginFormRef)">点击登录</p>
        </button>

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
    {min: 5, max: 15, message: '账号5-15个字符'},
  ],
  password: [
    {required: true, message: '请输入密码'},
    {min: 5, max: 15, message: '密码5-15个字符'},
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
@import "./style.scss";

.LoginForm {
  display: flex;
  justify-content: space-evenly;
}
</style>