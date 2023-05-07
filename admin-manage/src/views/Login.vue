<template>
  <div>
    <div style="background-color: rgba(148,240,209,0.41); width: 600px;height:300px;position:fixed;margin: auto;
    overflow: hidden;
    	      left: 0;
    	      right: 0;
    	      top:0;
    	      bottom: 0;
          ">
      <div :class="{Box2 : late}" class="Box1">
        <div class="Login">
          <el-form
              ref="LoginFormRef"
              :model="LoginForm"
              :rules="LoginFormRules"
              class="LoginForm"
              label-width="100px"
              status-icon
          >
            <el-form-item label="username" prop="username">
              <el-input
                  v-model="LoginForm.username"
                  autocomplete="off"/>
            </el-form-item>

            <el-form-item label="password" prop="password">
              <el-input
                  v-model="LoginForm.password"
                  autocomplete="off"
                  type="password"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm(LoginFormRef)">
                登录
              </el-button>
            </el-form-item>
            <el-button class="handoff" type="primary" @click="onHandoff">
              切换
            </el-button>
          </el-form>
        </div>
        <div class="Enroll">
          <el-form
              ref="EnrollFormRef"
              :model="EnrollForm"
              :rules="EnrollFormRules"
              class="EnrollForm"
              label-width="100px"
              status-icon
          >
            <el-form-item label="nickname" prop="nickname">
              <el-input
                  v-model="EnrollForm.nickname"
                  autocomplete="off"/>
            </el-form-item>

            <el-form-item label="username" prop="username">
              <el-input
                  v-model="EnrollForm.username"
                  autocomplete="off"/>
            </el-form-item>

            <el-form-item label="password" prop="password">
              <el-input
                  v-model="EnrollForm.password"
                  autocomplete="off"
                  type="password"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm2(EnrollFormRef)">
                注册
              </el-button>
            </el-form-item>
            <el-button class="handoff" type="primary" @click="onHandoff">
              切换
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'
import {ElMessage} from 'element-plus'
import store from "@/store";

const router = useRouter()
// 登录
const LoginFormRef = ref() //表单的引用对象
const LoginForm = reactive({//表单绑定的响应式对象
  username: "",
  password: ""
})
const LoginFormRules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 1, max: 10, message: 'Length should be 1 to 10', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ]
})
const late = ref(false)
const onHandoff = () => {
  console.log("111", late)
  late.value = !late.value
}
const submitForm = () => {
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
              // console.log("登录")
            } else {
              ElMessage({
                showClose: false,
                message: '用户名或密码不正确',
                type: 'error',
              })
            }
            //   3.输入错误，提示并清除密码
          })
          .catch(data => {
            console.log("no", data)
          })
    }
  })
}

// 注册
const EnrollFormRef = ref() //表单的引用对象
const EnrollForm = reactive({//表单绑定的响应式对象
  nickname: "",
  username: "",
  password: ""
})
const EnrollFormRules = reactive({
  nickname: [
    {required: true, message: '请输入昵称', trigger: 'blur'},
    {min: 1, max: 10, message: 'Length should be 1 to 10', trigger: 'blur'},
  ],
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ]
})
const submitForm2 = () => {
  alert('注册')
}
</script>


<style lang="scss" scoped>

.Box1 {
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 500ms;
  transform: rotateZ(0deg);
  transform-origin: 50% 100%;
}

.Box2 {
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 500ms;
  transform: rotateZ(180deg);
  transform-origin: 50% 100%;
}

.handoff {
  position: absolute;
  right: 50px;
  bottom: 30px;
  width: 100px;
  height: 30px;
}

//登录
.Login {
  width: 100%;
  height: 100%;
  position: absolute;
}

.LoginForm {
  box-sizing: border-box;
  width: 500px;
  height: 300px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 40px;

}

::v-deep( .el-form-item__label) {
  //样式穿透 ::v-deep
  color: palevioletred;
}


//注册
.Enroll {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-origin: bottom center;
  transform: rotateZ(180deg);
}

.EnrollForm {
  box-sizing: border-box;
  width: 500px;
  height: 300px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 40px;

}

::v-deep( .el-form-item__label) {
  //样式穿透 ::v-deep
  color: palevioletred;
}
</style>