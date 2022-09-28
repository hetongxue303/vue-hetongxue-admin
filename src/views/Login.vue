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
            <el-image :src="imgUrl" @click="getCode" style="cursor: pointer" title="点击切换验证码"/>
          </el-col>
        </el-form-item>
      </el-row>
      <el-form-item class="login-box-checkbox">
        <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
      </el-form-item>
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
import {getCodeImg, login} from '../api/login'
import {useCookies} from '@vueuse/integrations/useCookies'
import {decrypt, encrypt} from "../utils/jsencrypt";
import {setToken} from "../utils/auth";

const loading = ref<boolean>(true)
let redirect = ref<string | undefined>(undefined)
const router = useRouter()
const cookies = useCookies()
const ruleFormRef = ref<FormInstance>()
const imgUrl = ref<string>('')

const loginForm = reactive<any>({
  username: 'admin',
  password: '123456',
  code: '',
  rememberMe: false
})

const rules = reactive<FormRules>({
  username: [{required: true, message: '请输入您的账号', trigger: 'blur'}],
  password: [{required: true, message: '请输入您的密码', trigger: 'blur'}],
  code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
})

const getCode = async () => {
  const {data} = await getCodeImg()
  imgUrl.value = data.data
}

watch(() => imgUrl.value, () => loginForm.code = '')

const loginHandler = async (formEl: FormInstance | undefined) => {
  if (formEl) {
    await formEl.validate(async (valid) => {
      if (valid) {
        loading.value = false
        /* if (loginForm.rememberMe) {
           const time: Date = new Date(new Date().getTime() + COOKIE_EXPIRES + 3600000 * 24)
           cookies.set('username', loginForm.username, {expires: time})
           cookies.set('password', encrypt(loginForm.password), {expires: time})
           cookies.set('rememberMe', loginForm.rememberMe, {expires: time})
         } else {
           cookies.remove('username')
           cookies.remove('password')
           cookies.remove('rememberMe')
         }*/
        const {data, headers} = await login({
          username: loginForm.username,
          password: md5(md5(loginForm.password).split('').reverse().join('')),
          code: loginForm.code
        });
        switch (data.code as number) {
          case 200:
            ElMessage.success('登陆成功')
            setToken(headers.authorization)
            console.log('aa' + redirect.value)
            await router.push('/dashboard');
            break
          default:
            ElMessage.warning(data.message)
            await getCode()
        }
        loading.value = true
      }
    })
  }
}

const getCookie = () => {
  loginForm.username = cookies.get("username")
  loginForm.password = decrypt(cookies.get("password"))
  loginForm.rememberMe = cookies.get("rememberMe")
}

onMounted(() => {
  getCode()
  //getCookie()
})
</script>

<style scoped lang="scss">
.login-box-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-box-checkbox {
    margin-left: 0;
  }

  .login-box-input {
    width: 280px;
    height: 35px;
  }
}
</style>