<template>
  <div class="add">
    <el-card shadow="always">
      <el-form
          ref="ProductAddFormRef"
          :model="ProductAddForm"
          :rules="ProductAddFormRules"
          class="demo-ruleForm"
          status-icon
      >
        <el-form-item label="名字" prop="name">
          <el-input v-model.trim="ProductAddForm.name"/>
        </el-form-item>
        <el-form-item label="图标链接" prop="img">
          <el-input v-model.trim="ProductAddForm.img"/>
        </el-form-item>
        <el-form-item label="跳转链接" prop="Link">
          <el-input v-model.trim="ProductAddForm.Link"/>
        </el-form-item>
        <el-form-item label="分组" prop="grouping">
          <el-select
              v-model="ProductAddForm.grouping"
              class="m-2"
              placeholder="选择分组"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickAdd">
            提交
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
import axios from 'axios'

const ProductAddFormRef = ref()
let ProductAddForm = reactive({
  name: "",
  grouping: "开发",
  img: "",
  Link: "",
})
const url = '/adminapi/product/add'
// 表单规则
const ProductAddFormRules = reactive({
  name: [
    {required: true, message: '昵称', trigger: 'blur'},
    {min: 1, max: 30, message: 'Length should be 1 to 30', trigger: 'blur'},
  ],
  grouping: [
    {required: true, message: '用户名', trigger: 'blur'},
  ],
  img: [
    {required: true, message: '权限', trigger: 'blur'},
  ],
  Link: [
    {required: true, message: '密码', trigger: 'blur'},
  ]
})
const options = [
  {
    label: '开发',
    value: 0
  },
  {
    label: 'UI',
    value: 1
  },
  {
    label: '娱乐',
    value: 2
  },
]
// 添加
const clickAdd = () => {
  ProductAddFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log("222",ProductAddForm)
      await axios.post('/adminapi/product/add', ProductAddForm)
          .then(res=>{
            //   2.接收返回数据
            // console.log(res.data.ActionType)
            if (res.data.ActionType === "OK"){
              //   2.1.判断返回数据，通过则提示注册成功
              ElMessage({
                message: '提交成功',
                type: 'success',
              })
              // 3.清除输入框内容
              ProductAddFormRef.value.resetFields()
            }else{
              //   2.2返回数据不通过，则提示重复
              ElMessage({
                message: '已存在',
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