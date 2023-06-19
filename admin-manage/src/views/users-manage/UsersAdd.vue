<template>
  <div class="add">
    <el-card shadow="always">
      <el-form
          ref="userAddFormRef"
          :model="userAddForm"
          :rules="userAddFormRules"
          class="demo-ruleForm"
          status-icon
      >
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model.trim="userAddForm.nickname"/>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="userAddForm.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="userAddForm.password"/>
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-select
              v-model="userAddForm.role"
              class="m-2"
              placeholder="选择权限"
          >
            <el-option
                v-for="item in Permissions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select
              v-model="userAddForm.gender"
              class="m-2"
              placeholder="选择性别"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="说明" prop="introduction">
          <el-input v-model.trim="userAddForm.introduction"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea"
          />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <Up_Load :avatar="userAddForm.avatar" @uploadChange="handleChange"/>

        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="clickAdd">
            Upload
            <el-icon class="el-icon--right">
              <Upload/>
            </el-icon>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {Upload} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import Up_Load from '@/components/upload/Up_Load.vue'
import upload from "@/util/upload";

const userAddFormRef = ref()
let userAddForm = reactive({
  nickname: "",
  username: "",
  password: "",
  role: "",
  gender: "",
  introduction: "",
  avatar: "",
  file: null
})
const url = '/adminapi/user/useradd'
// 表单规则
const userAddFormRules = reactive({
  nickname: [
    {required: true, message: '昵称', trigger: 'blur'},
    {min: 1, max: 10, message: 'Length should be 1 to 10', trigger: 'blur'},
  ],
  username: [
    {required: true, message: '用户名', trigger: 'blur'},
    {min: 5, max: 15, message: 'Length should be 5 to 15', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '密码', trigger: 'blur'},
    {min: 5, max: 15, message: 'Length should be 5 to 15', trigger: 'blur'},
  ],
  role: [
    {required: true, message: '权限', trigger: 'blur'},
  ],
  gender: [
    {required: true, message: '性别', trigger: 'blur'},
  ],
  introduction: [
    {required: false, message: '说明', trigger: 'blur'},
  ],
  avatar: [
    {required: false, message: '头像', trigger: 'blur'},
  ],
})
// 性别选择字段
const options = [
  {
    label: '人妖',
    value: 0
  },
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 2
  },
]
// 权限选择字段
const Permissions = [
  {
    label: '管理员',
    value: 0
  },
  {
    label: '用户',
    value: 1
  },
  {
    label: '游客',
    value: 2
  },
]
// 每次选完图片的回调
const handleChange = (e) => {
  console.log(e)
  // userAddForm.avatar = e.raw  //不能直接复制给头像的src，需要通过URL.createObjectURL
  userAddForm.avatar = URL.createObjectURL(e)
  // 给后端使用的头像信息
  userAddForm.file = e
}
// 添加
const clickAdd = () => {
  userAddFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload(url, userAddForm)
          .then((res) => {
            // console.log(res)
            if (res.data.ActionType === "OK") {
              ElMessage({
                message: '添加成功',
                type: 'success',
              })
              // 添加成功后清空数据
              userAddFormRef.value.resetFields()
            } else {
              ElMessage({
                message: '用户已存在',
                type: 'warning',
              })
            }

          })

    } else {
      ElMessage({
        message: '请完整填写表单',
        type: 'error',
      })
    }
  })

}
</script>

<style lang="scss" scoped>
.add{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  .el-card {
  width: 900px;
    border-radius: 40px;
  }
}



</style>