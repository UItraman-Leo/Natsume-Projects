/**
* @author: Natsume
* @描述:上传组件
*/
<template>
  <el-upload
      :auto-upload="false"
      :on-change="onHandleChange"
      :show-file-list="false"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      class="avatar-uploader"
  >
    <img v-if="props.avatar" :src="loadAvatarUrl" class="avatar"/>
    <el-icon v-else class="avatar-uploader-icon">
      <Plus/>
    </el-icon>
  </el-upload>
</template>

<script setup>
import {defineEmits, defineProps, computed} from 'vue'
import {Plus} from '@element-plus/icons-vue'

const props = defineProps({
  avatar: String,
})
const emit = defineEmits(["uploadChange"])

const loadAvatarUrl = computed(() => {
  return props.avatar.includes('blob') ? props.avatar : `https://api.xia-mu.top:3000${props.avatar}`
})
// 每次选完图片的回调
const onHandleChange = (e) => {
  emit('uploadChange', e.raw)
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 178px;
  height: 178px;
}

::v-deep( .el-upload ) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep( .el-upload:hover) {
  border-color: var(--el-color-primary);
}

::v-deep(.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>