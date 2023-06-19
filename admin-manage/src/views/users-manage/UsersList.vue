<template>

    <el-card shadow="always" style="width: 65vmax;margin: auto">
      <el-table :data="tableData" max-height=80vh>
        <el-table-column fixed label="姓名" prop="nickname" width="180"/>
        <el-table-column label="头像" width="150">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-avatar :size="30"
                         :src="scope.row.avatar?`https://api.xia-mu.top:3000${scope.row.avatar}`
                         :'https://i.postimg.cc/xCcNTnNK/apple-touch-icon.png'"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="username" width="180"/>
        <el-table-column label="权限" width="150">
          <template #default="scope">
            <div style="display: flex; align-items: center">

              <el-tag :type="scope.row.role === 0 ? 'danger' : scope.row.role === 1 ? 'success' : 'info'"
                      class="ml-2">
                {{
                  scope.row.role === 0 ? '管理员' : scope.row.role === 1 ? '用户' : '游客'
                }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="gender" width="150">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              {{ scope.row.gender === 1 ? '男' : scope.row.gender === 2 ? '女' : '泰国来的' }}
            </div>
          </template>
        </el-table-column>
<!--        <el-table-column label="时间" prop="date" width="300"/>-->
        <el-table-column fixed="right" label="操作" width="140">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
            >Edit
            </el-button
            >
            <el-popconfirm
                :icon="InfoFilled"
                cancel-button-text="No, Thanks"
                confirm-button-text="OK"
                icon-color="#626AEF"
                title="Are you sure to delete this?"
                width="220"
                @confirm="handleDelete(scope.$index,scope.row)"
            >
              <template #reference>
                <el-button
                    size="small"
                    type="danger"
                >Delete
                </el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-if="dialogFormVisible" v-model="dialogFormVisible"
               title="修改用户信息">
      <el-form
          ref="userAddFormRef"
          :model="userAddForm"
          :rules="userFormRules">
        <el-form-item label="名字" prop="nickname">
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
              v-model.trim="userAddForm.role"
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
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onUpLoad()">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
</template>

<script setup>
import {InfoFilled} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import {ref, reactive, onMounted} from 'vue'
import axios from 'axios'

const dialogFormVisible = ref(false)
const userAddFormRef = ref()
let userAddForm = reactive({
  nickname: "",
  username: "",
  password: "",
  role: "",
})
const tableData = ref([])
// 表单规则
const userFormRules = reactive({
  nickname: [
    {required: true, message: '用户名', trigger: 'blur'},
    {min: 1, max: 10, message: 'Length should be 1 to 10', trigger: 'blur'},
  ],
  username: [
    {required: true, message: '用户名', trigger: 'blur'},
    {min: 1, max: 10, message: 'Length should be 1 to 10', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '密码', trigger: 'blur'},
    {min: 1, max: 15, message: 'Length should be 1 to 15', trigger: 'blur'},
  ],
  role: [
    {required: true, message: '权限', trigger: 'blur'},
  ],
})
// 权限
const options = [
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
onMounted(() => {
  getTableData()
})
// 获取数据库数据
const getTableData = async () => {
  const res = await axios({
    url: '/adminapi/user/list',
    method: 'get',
  })
  // console.log(res.data.data)
  if (res.data.ActionType === "OK") {
    tableData.value = res.data.data
  }

}
//修改用户信息
const handleEdit = async (data) => {
  // console.log(data)
  const res = await axios.get(`/adminapi/user/list/${data._id}`)
  Object.assign(userAddForm, res.data.data[0])
  // console.log(userAddForm)
  dialogFormVisible.value = true
}
// 点击后上传修改的用户信息
const onUpLoad = () => {
  userAddFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(userAddForm)
      // 1.往后端发送数据
      const res = await axios.put(`/adminapi/user/put/${userAddForm._id}`, userAddForm)

      if (res.data.ActionType === "OK") {
        ElMessage({
          message: '修改成功',
          type: 'success',
        })
        // 2，成功后关闭弹窗
        dialogFormVisible.value = false
        //   3.刷新数据，重新调用 getTableData()
        await getTableData();
      }


    }

  })
}
// 删除用户
const handleDelete = async (index, data) => {
  await axios({
    url: `/adminapi/user/list/${data._id}`,
    method: 'delete',
  })
  // 1.重新调用查询数据库方法，会再发一次请求
  // await getTableData();
  //2.直接在本地显示删除，相对提高性能
  tableData.value.splice(index, 1)
}

</script>

<style scoped>

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>