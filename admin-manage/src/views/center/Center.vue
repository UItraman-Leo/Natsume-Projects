<template>
  <div>
    <el-page-header
        content="个人中心"
        icon=""
        title="管理系统"
    />
    <el-row :gutter="20" class="el-row">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <el-avatar
              :size="100" :src='avatarUrl'
          />
          <h3>用户名:{{ nickname }}</h3>
          <h3>权限:{{ role===0?"管理员":role===1?"用户":"游客" }}</h3>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="always">
          <el-form
              ref="userFormRef"
              :model="userForm"
              :rules="userFormRules"
              class="demo-ruleForm"
              label-width="120px"
              status-icon
          >
            <el-form-item label="用户名" prop="nickname">
              <el-input v-model.trim="userForm.nickname"/>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
              <el-select
                  v-model="userForm.gender"
                  class="m-2"
                  placeholder="Select"
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
              <el-input v-model.trim="userForm.introduction"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        type="textarea"
              />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <Up_Load :avatar="userForm.avatar" @uploadChange="handleChange"/>

            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="clickUpload">
                Upload
                <el-icon class="el-icon--right">
                  <Upload/>
                </el-icon>
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {useStore} from "vuex"
import {computed, ref, reactive} from 'vue'
import {Upload} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import upload from "@/util/upload"
import Up_Load from '@/components/upload/Up_Load.vue'

const store = useStore()
// 头像，没有设置给默认
const avatarUrl = computed(() => store.state.userInfo.avatar ? `http://localhost:3000${store.state.userInfo.avatar}` : "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")

// store里的信息
const {nickname, gender, introduction, avatar, role} = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
  nickname,
  gender,
  introduction,
  avatar,
  file: null
})
const url = '/adminapi/user/upload'
// 表单规则
const userFormRules = reactive({
  nickname: [
    {required: true, message: '用户名', trigger: 'blur'},
    {min: 1, max: 10, message: 'Length should be 1 to 10', trigger: 'blur'},
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
// 每次选完图片的回调
const handleChange = (e) => {
  // console.log(e)
  // userForm.avatar = e.raw  //不能直接复制给头像的src，需要通过URL.createObjectURL
  userForm.avatar = URL.createObjectURL(e)
  // 给后端使用的头像信息
  userForm.file = e
}
//点击上传表单
const clickUpload = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload(url, userForm)
          .then(res => {
            // console.log('上传发送', res.data)
            if (res.data.ActionType === 'OK') {
              store.commit("changeUserInfo", res.data.data)
              ElMessage({
                message: '修改成功',
                type: 'success',
              })
            }
          })
          .catch(() => {
            // console.log('上传失败', err)
            ElMessage({
              message: '修改失败',
              type: 'error',
            })

          })
    }
  })

}
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 20px;

  .box-card {
    text-align: center;
  }
}


</style>