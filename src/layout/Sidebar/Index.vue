<template>
  <div class="menus">
    <el-menu
        :default-active="active"
        router
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF">
      <MenuItem :data="data"/>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import {mockData} from '../../api/mockData'
import {IMenuItem} from '../types'
import {computed} from 'vue'
import {useRoute} from 'vue-router'

// 测试数据
const data: Array<IMenuItem> = mockData.data.menus

defineProps({
  isCollapse: {type: Boolean, required: true, default: false}
})

const route = useRoute()
const active = computed((): string => {
  return route.path
})
</script>

<style scoped lang="scss">
// 折叠动画
.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
}

.menus {
  width: auto;
  height: 100%;
}

.el-menu {
  height: 100%;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>