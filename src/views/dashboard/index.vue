<template>
  <div>
    <h1>Dashboard page</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <!-- icon-class svg图标名称 class-name 额外的自定义类名 @click绑定事件 -->
    <svg-icon
      icon-class="404"
      class-name="custom-class"
      @click="sayHi"
    ></svg-icon>
    <el-date-picker v-model="value1" type="date" placeholder="Pick a day">
    </el-date-picker>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, getCurrentInstance } from 'vue'

const value1 = ref('')
const sayHi = () => {
  ElMessage.success('恭喜你，这是一条成功消息')
  console.log(getCurrentInstance())
}
</script>
<style lang="scss">
.custom-class {
  // 自定义样式404
  font-size: 200px;
  color: green;
}
</style>
