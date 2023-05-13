/**
* @author: Natsume
* @描述:文本编辑组件-wangeditor组件封装
*
*/
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
        :defaultConfig="toolbarConfig"
        :editor="editorRef"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
    />
    <Editor
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        style="height: 500px; overflow-y: hidden;"
        @onChange="handleChange"
        @onCreated="handleCreated"
    />
  </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, ref, shallowRef, defineEmits,defineProps} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
// '<p>hello <strong>world</strong></p>'
const mode = ref('simple')
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const emit = defineEmits(["content"])
const props = defineProps({
  content:String
})

// 内容 HTML
const valueHtml = ref()
const handleChange = () => {
  emit("content", valueHtml.value)
}
// console.log(props.content)
// 编辑时将内容传递过来，并赋值给内容区
valueHtml.value = props.content
const toolbarConfig = {}
const editorConfig = {placeholder: '请输入内容...'}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const Editor = editorRef.value
  if (Editor == null) return
  Editor.destroy()
})

const handleCreated = (Editor) => {
  editorRef.value = Editor // 记录 editor 实例，重要！

}
</script>

<style scoped>

</style>