<template>
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>

<script lang="ts" setup>
// 针对路径时外链  就渲染为a标签 如果是正常路由路径 就渲染为 router-link
//el-menu组件的router属性去掉了 不开启路由模式

import { isExternal } from '@/utils/validate'
import { computed } from 'vue'
const props = defineProps<{ to: string }>()
//判断接受的路径 是不是外链
const isExt = computed(() => isExternal(props.to))

const type = computed(() => {
  if (isExt.value) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = computed(() => {
  if (isExt.value) {
    return {
      //a标签的一些原生属性
      href: props.to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: props.to
  }
})
</script>
