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
            />
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="200">
          <template #default="scope">
            <el-button :icon="Search" circle />
            <el-button type="primary" :icon="Edit" circle />
            <el-button type="danger" :icon="Delete" circle />
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script setup>
import {ref,onMounted} from "vue"
import { Check, Close, Delete, Edit, Search} from '@element-plus/icons-vue'
import axios from "axios"
import formatTime from "@/util/formatTime"
const tableData = ref([])
// 分类格式
const classify = ref([
    "最新","典型","通知"
])
onMounted(()=>{
  getTableData()
})
const getTableData = async ()=>{
  const res = await axios.get("adminapi/new/list")
  if (res.data.ActionType === "OK"){
    tableData.value = res.data.data
    console.log(tableData)
  }
}

</script>

<style scoped>

</style>