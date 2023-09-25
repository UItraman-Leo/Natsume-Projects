<template>
  <div>
    <el-card shadow="always" style="width: 80%;margin:0 auto;">
      <el-table :data="tableData" max-height=80vh style="width: 100%">
        <el-table-column label="标题" prop="title" width="300"/>
        <el-table-column label="分类" width="150">
          <template #default="scope">
            {{classify[scope.row.category-1]}}
          </template>
        </el-table-column>
        <el-table-column label="时间" width="200">
          <template #default="scope">
            {{formatTime.getTime(scope.row.date)}}
          </template>
        </el-table-column>
        <el-table-column label="是否发布" width="180">
          <template #default="scope">
            <el-switch
                v-model="scope.row.isPublish"
                class="mt-2"
                style="margin-left: 24px"
                inline-prompt
                :active-value="1"
                :inactive-value="0"
                :active-icon="Check"
                :inactive-icon="Close"
                @change="publishSwitch(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="200">
          <template #default="scope">
            <el-button :icon="Search" circle @click="changePreview(scope.row)"/>
            <el-button type="primary" :icon="Edit" circle @click="changeEdit(scope.row)"/>
            <el-button type="danger" :icon="Delete" circle @click="changeDelete(scope.row._id)"/>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
<!--    预览框-->
    <el-drawer
        :data="Preview"
        v-model="previewState"
        title="预览"
        :direction="direction"
    >
      <div>
        <h2>{{ Preview.title }}</h2>
        <span style="font-size: 10px;color:grey">{{formatTime.getTime(Preview.date)}}</span>
        <el-divider>
            <el-icon><Promotion /></el-icon>
        </el-divider>
        <div class="formatter" v-html="Preview.content"></div>
      </div>

    </el-drawer>
  </div>
</template>

<script setup>
import {ref,onMounted} from "vue"
import { Check, Close, Delete, Edit, Search,Promotion} from '@element-plus/icons-vue'
import axios from "axios"
import formatTime from "@/util/formatTime"
import {useRouter} from "vue-router"
import limitsOfAuthority from "@/util/limitsOfAuthority";
		
const router = useRouter()

const tableData = ref([])
// 存放预览信息
const Preview = ref()
// 弹出预览界面状态
const previewState = ref(false)
// 预览打开的方向
const direction = ref('ltr')
// 分类格式
const classify = ref([
    "游戏热点","体育娱乐","文章"
])
// 初始获取列表信息
onMounted(()=>{
  getTableData()
})
const getTableData = async ()=>{
  const res = await axios.get("adminapi/new/list")
  if (res.data.ActionType === "OK"){
    tableData.value = res.data.data
    // console.log(tableData)
  }
}
// 切换发布开关，发送请求，修改状态
const publishSwitch = async (item)=>{
  if (!limitsOfAuthority()) return
  // console.log(item)
 await axios({
    url: `/adminapi/new/switch`,
    method: 'put',
    data:{
      id:item._id,
      isPublish:item.isPublish
    }
  })
}
// 点击预览
const changePreview = (item)=>{
  Preview.value = item
  previewState.value = true
  // console.log(Preview)
}
// 点击修改
const changeEdit = (item)=>{
// 跳转到 users-manage/newedit
  router.push(`/news-manage/newedit/${item._id}`)
}
//点击删除
const changeDelete = async (_id)=>{
  if (!limitsOfAuthority()) return
 const res = await axios.delete(`/adminapi/new/setDel/${_id}`)
  if (res.data.ActionType === 'OK'){
    await getTableData()
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.formatter){
  img{
    max-width: 100%;
  }
}
</style>