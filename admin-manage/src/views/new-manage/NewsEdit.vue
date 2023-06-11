<template>
  <div>
    <el-card shadow="always">
      <el-page-header :icon="ArrowLeft" title="文章列表" @back="backOff" style="margin-bottom: 40px;margin-left: 20px;">
        <template #content>
          <span class="text-large font-600 mr-3"> 修改 </span>
        </template>
      </el-page-header>
      <el-form
          ref="newFormRef"
          :model="newForm"
          :rules="newFormRules"
          class="demo-ruleForm"
          label-width="120px"
          status-icon
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="newForm.title"/>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <Editor v-if="newForm.content" @content="contentChange" :content="newForm.content"></Editor>
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
            修改
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
import {Upload,ArrowLeft} from '@element-plus/icons-vue'
import {ref, reactive,onMounted} from 'vue'
import Up_Load from '@/components/upload/Up_Load.vue'
import upload from '@/util/upload'
import Editor from '@/components/editor/Editor.vue'
import axios from 'axios'
import {useRouter,useRoute} from "vue-router"
const router = useRouter()
const route = useRoute()

const newFormRef = ref()
let newForm = reactive({
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
    {min: 1, max: 20, message: 'Length should be 1 to 20', trigger: 'blur'},
  ],
  content: [
    {required: true, message: '内容', trigger: 'blur'},
    {min: 1, max: 99999, message: 'Length should be 1 to 20', trigger: 'blur'},
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
// 通过id onMounted 时获取数据
onMounted(async ()=>{
  // console.log("dfs",route.params.id)
  const res = await axios.get(`adminapi/new/list/${route.params.id}`)
  if (res.data.ActionType === "OK"){
    Object.assign(newForm,res.data.data[0])
  }
})
// 点击回退
const backOff = ()=>{
  router.back()
}
// 获取文本框内容
const contentChange = (data) => {
  newForm.content = data
}
// 获取头像
const coverChange = (e) => {
  // userForm.avatar = e.raw  //不能直接复制给头像的src，需要通过URL.createObjectURL
  newForm.cover = URL.createObjectURL(e)
  // 给后端使用的头像信息
  newForm.file = e
}
//点击后上传
const clickUpload = () => {
  newFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(newForm)
      await upload('/adminapi/new/list',newForm)
      router.back()
    }
  })

}
</script>

<style scoped>

</style>