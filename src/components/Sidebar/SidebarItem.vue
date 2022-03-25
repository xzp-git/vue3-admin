<template>
  <div v-if="!item.meta || !item.meta.hidden" class="sidebar-item-container">
    <!-- 只渲染一个路由 并且路由只有一个子路由时直接渲染这个子路由 -->
    <template v-if="isRenderSingleRoute && theOnlyOneChildRoute">
      <sidebar-item-link
        v-if="theOnlyOneChildRoute.meta"
        :to="resolvePath(theOnlyOneChildRoute.path)"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChildRoute.path)">
          <!-- <el-icon v-if="theOnlyOneChildRoute.meta.elIcon" class="menu-icon">
            <eleme-filled />
          </el-icon> -->
          <svg-icon v-if="icon" class="menu-icon" :icon-class="icon"></svg-icon>
          <template #title>
            <span>{{ theOnlyOneChildRoute.meta?.title }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <!-- 多个子路由时 -->
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <svg-icon
          v-if="item.meta.icon"
          class="menu-icon"
          :icon-class="item.meta.icon"
        >
        </svg-icon>
        <span class="submenu-title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      >
      </sidebar-item>
    </el-sub-menu>
  </div>
</template>
<script setup lang="ts">
import { isExternal } from '@/utils/validate'
import path from 'path-browserify'
import { computed, toRefs } from 'vue'
import type { RouteRecord } from 'vue-router'
const props = defineProps<{
  // 当前路由（此时的父路由）
  item: RouteRecord
  // 父路由路径（子路由路径如果是相对的 要基于父路径）
  basePath: string
}>()
const { item } = toRefs(props)

//渲染菜单主要先看子路由
//比如我们的路由一级路由一般都是layout组件 二级路由才是我们考虑要渲染成菜单的

//子路由数量
const showingChildNumber = computed(() => {
  //hidden 路由排除掉 只算可渲染子路由
  const children = (props.item.children || []).filter((child) => {
    if (child.meta && child.meta.hidden) return false
    return true
  })
  return children.length
})
// 是否有可渲染子路由
const noShowingChildren = computed(() => showingChildNumber.value === 0)
//要渲染的单个路由 如果该路由只有一个子路由 默认直接渲染这个子路由
//theOnlyOneChildrenRoute直接通过el-menu-item 组件来渲染
const theOnlyOneChildRoute = computed(() => {
  //多个children时 直接return null 多children需要用el-submenu来渲染并递归
  if (showingChildNumber.value > 1) {
    return null
  }
  //只有一个子路由 还要筛选路由meta里有无hidden属性hidden：true 则过滤出去 不用管
  //路由meta里我们会配置hidden属性表示不渲染成菜单，比如login401 404页面不渲染成菜单的
  if (item.value.children) {
    for (const child of item.value.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  //showingChildNumer === 0 无可渲染的子路由  （可能会有子路由hidden属性为 true）
  //无可渲染children时 把当前路由item作为仅有的子路由渲染
  return {
    ...props.item,
    path: '' //resolvePath避免resolve拼接时 拼接重复
    // noShowingChildren: true // 无可渲染chiildren
  }
})
const icon = computed(() => {
  //子路由 如果icon没有就用父路由的
  return (theOnlyOneChildRoute.value?.meta?.icon ||
    (props.item.meta && props.item.meta.icon)) as string
})
// 利用path.resolve 根据父路径+子路径 解析成正确路径 子路径可能是相对的
// resolvePath在模板中使用
const resolvePath = (childPath: string) => {
  // 如果是带协议外链 直接返回
  if (isExternal(childPath)) {
    return childPath
  }
  return path.resolve(props.basePath, childPath)
}
// 设置 alwaysShow: true，这样它就会忽略上面定义的规则，一直显示根路由 哪怕只有一个子路由也会显示为嵌套的路由菜单
const alwaysShowRootMenu = computed(
  () => props.item.meta && props.item.meta.alwaysShow
)

// 是否只有一条可渲染路由
const isRenderSingleRoute = computed(
  () =>
    !alwaysShowRootMenu.value &&
    (!theOnlyOneChildRoute.value?.children || noShowingChildren.value)
)
</script>
<style lang="scss">
.menu-icon {
  margin: 0;
  vertical-align: middle;
  width: 24px;
  text-align: center;
  font-size: 18px;
  flex-shrink: 0;
}
</style>
