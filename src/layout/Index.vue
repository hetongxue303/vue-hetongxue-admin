<template>
  <el-container class="layout-parent">
    <el-aside class="layout-aside">
      Aside
    </el-aside>
    <el-container class="layout-sub">
      <el-header class="layout-header">
        <el-button type="success" @click="handlerLogout">退出登录</el-button>
      </el-header>
      <el-main class="layout-main">
        <router-view/>
      </el-main>
      <el-footer class="layout-footer">
        Footer
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import {userLogout} from '../api/user/login'
import {useUserStore} from '../store/modules/user'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handlerLogout = async () => {
  const {data} = await userLogout()
  switch (data.code as number) {
    case 200:
      userStore.userLogout()
      ElMessage.success('注销成功')
      await router.push('/login')
      break
    default:
      ElMessage.error('注销失败')
  }
}
</script>

<style scoped lang="scss">
.layout-parent {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;

  .layout-aside {
    height: 100vh;
    width: auto;
  }

  .layout-sub {
    height: 100%;
    width: 100%;

    .layout-header {
      padding: 0;
      margin: 0;
      height: 50px;
      display: flex;
      justify-content: right;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .layout-main {
      height: 100%;
      width: 100%;
    }

    .layout-footer {
      height: 30px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
}
</style>