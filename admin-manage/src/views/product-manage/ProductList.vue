<template>
  <div>
    <el-card shadow="always" style="width: 650px;margin:0 auto;">
      <el-table :data="tableData" max-height=80vh style="width: 100%">
        <el-table-column label="名字" prop="name" width="200"/>
        <el-table-column label="图标" width="200">
          <template #default="scope">
            <el-avatar shape='square'
                        :size="50"
                       :src="scope.row.img
"
            />

          </template>
        </el-table-column>
        <el-table-column  label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" :icon="Edit" circle @click="changeEdit(scope.row)"/>
            <el-button type="danger" :icon="Delete" circle @click="changeDelete(scope.row._id)"/>
          </template>
        </el-table-column>
      </el-table>
      <!--        修改-->
      <el-dialog v-model="dialogFormVisible" width="700" title="修改" center="true" align-center="true" :before-close="clickCancelTrevise">
        <el-form :model="fromData" :rules="reviseFormRules" ref="ProductListFormRef">
          <el-form-item label="名字" prop="name" :label-width="formLabelWidth">
            <el-input v-model.trim="fromData.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="图标链接" prop="img" :label-width="formLabelWidth">
            <el-input v-model.trim="fromData.img" autocomplete="off" />
          </el-form-item>
          <el-form-item label="跳转链接" prop="Link" :label-width="formLabelWidth">
            <el-input v-model.trim="fromData.Link" autocomplete="off" />
          </el-form-item>
          <el-form-item label="分组" prop="grouping" :label-width="formLabelWidth">
            <el-select
                v-model="fromData.grouping"
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
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="clickCancelTrevise">取消</el-button>
        <el-button type="primary" @click="clickCommiTrevise(fromData)">
          提交
        </el-button>
      </span>
        </template>
      </el-dialog>
    </el-card>

  </div>
</template>

<script setup>
import {ref,onMounted,reactive} from "vue"
import {Delete, Edit} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import axios from "axios"
const tableData = ref([])
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const fromData = ref([])
const ProductListFormRef = ref()
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
// 表单规则
const reviseFormRules = reactive({
  name: [
    {required: true, message: '名字', trigger: 'blur'},
    {min: 1, max: 30, message: 'Length should be 1 to 30', trigger: 'blur'},
  ],
  grouping: [
    {required: true, message: '分组', trigger: 'blur'},
  ],
  img: [
    {required: true, message: '图标链接', trigger: 'blur'},
  ],
  Link: [
    {required: true, message: '跳转链接', trigger: 'blur'},
  ]
})

// 初始获取列表信息
onMounted(()=>{
  getTableData()
})
 const getTableData = async ()=>{
  const res = await axios.get("adminapi/product/getlist")
  if (res.data.ActionType === "OK"){
    tableData.value = res.data.data
    // console.log("@@@",res,tableData.value)
  }
}
// 点击弹出修改
const changeEdit = (item)=>{
  dialogFormVisible.value = true
  fromData.value = item
}
const clickCancelTrevise = async ()=>{
  await getTableData()
  dialogFormVisible.value = false
}
// 提交修改
const clickCommiTrevise = async (item)=>{
  ProductListFormRef.value.validate(async (valid) => {
    if (valid) {
      await axios.put(`/adminapi/product/put/`, item)
          .then(async data=>{
            if (data.data.ActionType==="OK"){
              await getTableData()
              dialogFormVisible.value = false
              ElMessage({
                message: '提交成功',
                type: 'success',
              })
            }
          })
    }else {
      //   2.2返回数据不通过，则提示重复
      ElMessage({
        message: '错误',
        type: 'warning',
      })
    }
  })
}

//点击删除
const changeDelete = async (_id)=>{
  const res = await axios.delete(`/adminapi/product/setDel/${_id}`)
  if (res.data.ActionType === 'OK'){
    await getTableData()
  }
}
</script>

<style lang="scss" scoped>

</style>