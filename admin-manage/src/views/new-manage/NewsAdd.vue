<template>
  <div>
    <el-card shadow="always">
      <el-form
          ref="newFormRef"
          :model="newForm"
          :rules="newFormRules"
          class="demo-ruleForm"
          label-width="120px"
          status-icon
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="newForm.title"/>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <Editor @content="contentChange"></Editor>
        </el-form-item>
        <el-form-item label="类型" prop="category">
          <el-select
              v-model="newForm.category"
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
        <el-form-item label="封面" prop="cover">
          <Up_Load :avatar="newForm.cover" @uploadChange="coverChange"/>

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

  </div>
</template>

<script setup>
import {Upload} from '@element-plus/icons-vue'
import {ref, reactive} from 'vue'
import upload from "@/util/upload"
import Up_Load from '@/components/upload/Up_Load.vue'
import {ElMessage} from 'element-plus'
import Editor from '@/components/editor/Editor.vue'

const newFormRef = ref()
const newForm = reactive({
  title: "",
  content: "",
  category: 1,
  isPublish: 0,
  cover: "",
  file: null,
  date: Date.now()
})
// 表单规则
const newFormRules = reactive({
  title: [
    {required: true, message: '标题', trigger: 'blur'},
    {min: 1, max: 50, message: 'Length should be 1 to 50', trigger: 'blur'},
  ],
  content: [
    {required: true, message: '内容', trigger: 'blur'},
    {min: 1, max: 99999, message: 'Length should be 1 to 99999', trigger: 'blur'},
  ],
  category: [
    {required: true, message: '性别', trigger: 'blur'},
  ],
  cover: [
    {required: true, message: '图片', trigger: 'blur'},
  ],
})
const options = [
  {
    label: '游戏热点',
    value: 1
  },
  {
    label: '体育娱乐',
    value: 2
  },
  {
    label: '文章',
    value: 3
  },
]
const contentChange = (data) => {
  newForm.content = data
}
const coverChange = (e) => {
  // userForm.avatar = e.raw  //不能直接复制给头像的src，需要通过URL.createObjectURL
  newForm.cover = URL.createObjectURL(e)
  // 给后端使用的头像信息
  newForm.file = e
}

const clickUpload = () => {
  newFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(newForm)
      await upload('/adminapi/new/add', newForm)
          .then(res => {
            // console.log('上传发送', res.data)
            if (res.data.ActionType === 'OK') {
              ElMessage({
                message: '编辑成功',
                type: 'success',
              })
            }
          })
          .catch(() => {
            // console.log('上传失败', err)
            ElMessage({
              message: '编辑失败',
              type: 'error',
            })

          })
    }
  })

}
</script>

<style scoped>

</style>