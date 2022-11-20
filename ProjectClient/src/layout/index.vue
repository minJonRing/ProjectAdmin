<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { reactive, ref } from 'vue'
import { mapGetters, useStore } from 'vuex'
import avatar from '@/assets/user.jpg'
import { deleteToken } from '@/utils/token'
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { userType } from '@/zd'
// components
import NavBar from './navbar.vue'
import {
  User,
  Plus,
  Search,
  Star,
  CircleCheckFilled,
  SwitchButton,
  Reading
} from '@element-plus/icons-vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['loading', 'userInfo']),
    returnUserType() {
      const value = userType.map(({ value }) => value)
      return (this.userInfo.type || []).map(i => {
        const index = value.indexOf(i)
        return userType[index]
      })
    }
  },
  setup() {
    const store = useStore()

    const router = useRouter()
    const handleOut = () => {
      deleteToken('token')
      store.dispatch('user/resetToken')
      ElNotification.success('退出成功')
      router.push('/login')
    }
    return {
      // 图标
      Reading,
      User,
      Plus,
      Search,
      Star,
      CircleCheckFilled,
      SwitchButton,
      avatar,
      sysTitle: '开发系统',
      // 退出登录
      handleOut
    }
  }
}
</script>

<template>
  <el-container class="app">
    <el-header class="layout-head">
      <NavBar />
    </el-header>
    <el-main
      class="layout-main"
      v-loading="loading"
    >
      <el-card
        shadow="always"
        :body-style="{ padding: '18px' }"
      >
        <router-view />
      </el-card>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
.app {
  height: 100%;
  background-color: #f8f8f8;
  .layout-head {
    height: auto;
    padding: 0;
    border-bottom: 10px solid deepskyblue;
  }
  .layout-main {
    padding: 0;
    overflow: hidden;
    .el-card {
      height: 100%;
      ::v-deep(.el-card__body) {
        height: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
