<template>
  <div class="Enroll">
    <div class="title">
      <p>注册</p>
    </div>
    <el-form
        ref="EnrollFormRef"
        :model="EnrollForm"
        :rules="EnrollFormRules"
        class="EnrollForm"
        label-width="auto"
        status-icon
    >
      <el-form-item prop="nickname">
        <el-input

            placeholder="用户名"
            v-model.trim="EnrollForm.nickname"
            autocomplete="off"
            type="text"
        />
      </el-form-item>
      
      <el-form-item prop="username">
        <el-input
            placeholder="账号"
            v-model.trim="EnrollForm.username"
            autocomplete="off"
            type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
            placeholder="密码"
            v-model.trim="EnrollForm.password"
            autocomplete="off"
            type="password"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" round size="100px" :disabled="disabled" @click="submitForm(EnrollFormRef)">
         注册
        </el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {reactive, ref,defineEmits} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'
import {ElMessage} from 'element-plus'

const router = useRouter()
const EnrollFormRef = ref()
const EnrollForm = reactive({
  nickname:"",
  username: "",
  password: ""
})
const EnrollFormRules = reactive({
  nickname: [
    {required: true, message: '请输入用户名' },
    {min: 1, max: 10, message: 'Length should be 1 to 10'},
  ],
  username: [
    {required: true, message: '请输入账号'},
    {min: 5, max: 15, message: 'Length should be 5 to 15'},
  ],
  password: [
    {required: true, message: '请输入密码'},
    {min: 5, max: 15, message: 'Length should be 5 to 15'},
  ]
})
// 按钮点击状态
const disabled = ref(false)
//
const emit = defineEmits(["content"])
const submitForm =()=>{
  disabled.value = true
  EnrollFormRef.value.validate(async (valid)=>{
    //校验通过
    if (valid){
    //   1.发送请求
      await axios.post('/adminapi/user/enroll', EnrollForm)
          .then(res=>{
            //   2.接收返回数据
            // console.log(res.data.ActionType)
            if (res.data.ActionType === "OK"){
              //   2.1.判断返回数据，通过则提示注册成功
              ElMessage({
                message: '注册成功',
                type: 'success',
              })
              emit("content", '1')
              // 3.清除输入框内容
              EnrollFormRef.value.resetFields()
            }else{
              //   2.2返回数据不通过，则提示账号重复
              ElMessage({
                message: '账号已存在',
                type: 'warning',
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
.Enroll {
  position:relative;
  //标题
  .title{
    width: 100%;
    height: 85px;
    background: 120px -20px url("https://i.postimg.cc/8ChzHzM0/aigei-com.gif") no-repeat;

    p{
      font-family: cursive;
      font-size: 3.5em;
      font-weight: bold;
      text-align:center;
    }
  }
  //表单
  .EnrollForm {
    padding: 0;
    .el-input{
      margin: 5px 20px 5px 20px;
    }
    .el-button{
      width: 100%;
      margin: 3px 30px 0 30px;
    }
  }
}

</style>