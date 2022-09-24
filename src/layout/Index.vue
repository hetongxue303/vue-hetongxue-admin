<template>
  <el-button type="success" @click="handlerLogout">退出登录</el-button>
  <router-view/>
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

</style>