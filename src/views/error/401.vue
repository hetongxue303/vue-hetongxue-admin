<template>
  <div class="errPage-container">
    <el-button class="pan-back-btn" @click="router.go(-1)">
      <template #icon>
        <el-icon :size="20">
          <Back/>
        </el-icon>
      </template>
      &nbsp;{{ pageInfo401.bthText }}
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">{{ pageInfo401.tip }}</h1>
        <h2>{{ pageInfo401.h2 }}</h2>
        <h6>{{ pageInfo401.h6 }}</h6>
        <ul class="list-unstyled">
          <li>{{ pageInfo401.other }}</li>
          <li class="link-type">
            <router-link to="/">{{ pageInfo401.link1 }}</router-link>
          </li>
          <li class="link-type">
            <a :href="pageInfo401.link2Path">{{ pageInfo401.link2 }}</a>
          </li>
          <li><a href="#" @click.prevent="pageInfo401.dialogVisible=true">{{ pageInfo401.link3 }}</a></li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="noAuth" style="margin-top: -100px" width="313" height="428">
      </el-col>
    </el-row>
    <el-dialog v-model="pageInfo401.dialogVisible" :show-close="false">
      <img :src=pageInfo401.randomImg class="pan-img">
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import noAuth from '../../assets/images/error/401.gif'
import {useRouter} from 'vue-router'
import {Back} from '@element-plus/icons-vue'
import {reactive} from "vue";

const router = useRouter()
const pageInfo401 = reactive({
  bthText: '返回',
  tip: '权限不足！',
  h2: '你无权访问该页面',
  h6: '如需访问请联系你管理员',
  other: '或者你可以去:',
  link1: '返回首页',
  link2: '随便看看',
  link2Path: 'https://www.csdn.net/',
  link3: '点我看图',
  randomImg: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
  dialogVisible: false
})
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 200px auto;

  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .pan-gif {
    margin: 0 auto;
    display: block;
  }

  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text-jumbo {
    margin-top: 12px;
    margin-bottom: 5px;
    font-size: 40px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>