<template>
  <div>
    <!-- 测试展开收起 -->
    <h6 @click="isCollapse = !isCollapse">展收测试</h6>

    <el-menu
      class="sidebar-container-menu"
      router
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <sidebar-item
        v-for="routeItem in menuRoutes"
        :key="routeItem.path"
        :item="routeItem"
        :base-path="routeItem.path"
      />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import variables from '@/assets/styles/variables.scss'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from '@/router'
import computedScss from '@/hooks/computed-scss'
const route = useRoute()
const activeMenu = computed(() => {
  //根据路由路径对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
  const { path } = route
  return path
})
//scss变量
const scssVariables = computedScss(String(variables))
// 渲染路由
const menuRoutes = computed(() => routes)

//菜单展开收起状态，后面会放在store里
const isCollapse = ref(true)
</script>
