<template>
  <div style="display: flex;justify-content: center;align-items: center;width: 100%;height: 85%;">
    <el-form :model="loginForm" :rules="rules" ref="ruleFormRef" class="login-box-form">
      <el-form-item prop="username">
        <el-input class="login-box-input" type="text" v-model="loginForm.username" placeholder="请输入用户名">
          <template #prefix>
            <el-icon>
              <component is="user"/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="login-box-input" type="password" v-model="loginForm.password" placeholder="请输入密码"
                  show-password>
          <template #prefix>
            <el-icon>
              <component is="lock"/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-row :gutter="5">
        <el-form-item class="login-box-input" prop="code">
          <el-col :span="15">
            <el-input type="text" v-model="loginForm.code" placeholder="请输入验证码">
              <template #prefix>
                <el-icon>
                  <component is="key"/>
                </el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="9" style="display: flex;justify-content: center;align-items: center">
            <el-image :src="imgUrl" @click="changeImageCode" style="cursor: pointer" title="点击切换验证码"/>
          </el-col>
        </el-form-item>
      </el-row>
      <el-button style="height: 30px;width: 280px" type="primary" @click="loginHandler(ruleFormRef)">
        <span v-if="loading">登 录</span>
        <span v-else>登 录 中...</span>
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from 'vue'
import {ElMessage, FormInstance, FormRules} from 'element-plus'
import md5 from 'js-md5'
import {useRouter} from 'vue-router'
import {useUserStore} from '../store/modules/user'
import {userGetCode, userLogin} from '../api/user/login'

const loading = ref<boolean>(true)

const loginForm = reactive<any>({
  username: 'admin',
  password: '123456',
  code: '123'
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [
    {required: true, message: '账号不能为空', trigger: 'blur'},
    {min: 4, max: 20, message: '账号长度为4到20', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 50, message: '密码长度为6到50', trigger: 'blur'}
  ],
  code: [
    {required: true, message: '验证码不能为空', trigger: 'blur'}
  ]
})

const imgUrl = ref<string>('')
const changeImageCode = async () => {
  const {data} = await userGetCode()
  imgUrl.value = data.data
}

watch(() => imgUrl.value, () => loginForm.code = '')

const router = useRouter()
const userStore = useUserStore()
const loginHandler = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = false
      const {data, headers} = await userLogin({
        username: loginForm.username,
        password: md5(md5(loginForm.password).split('').reverse().join('')),
        code: loginForm.code
      })
      switch (data.code as number) {
        case 200:
          ElMessage.success('登陆成功')
          userStore.saveAuthorization(headers.authorization)
          userStore.saveRouters(data.data.routers)
          userStore.saveMenus(data.data.menus)
          await router.push('/dashboard');
          break
        default:
          ElMessage.warning(data.message)
          await changeImageCode()
          loginForm.code = ''
      }
      loading.value = true
    }
  })
}

onMounted(() => {
  changeImageCode()
})
</script>

<style scoped lang="scss">
.login-box-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-box-input {
    width: 280px;
    height: 35px;
  }
}
</style>