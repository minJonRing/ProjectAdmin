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
  <el-card
    class="navbar"
    shadow="always"
    :body-style="{ padding: '18px' }"
  >
    <!-- 头像 用户信息 -->
    <el-space
      size="large"
      class="user"
    >
      <el-image
        style="width: 60px; height: 60px"
        :src="userInfo ? userInfo.avatar : avatar"
        fit="cover"
      />
      <div class="user-info">
        <el-tag
          v-for="i in returnUserType"
          :type="i.type"
          :key="i"
        >
          {{ i.label }}
        </el-tag>
        <div>{{ userInfo.name || `欢迎访问${sysTitle}` }}</div>
      </div>
    </el-space>
    <!-- 项目进程 -->
    <el-space
      v-if="userInfo.name"
      size="large"
      class="user"
    >
      <div class="user-project">
        <router-link
          class="item"
          to="/article/list"
        >
          <el-tooltip
            content="文章"
            placement="top"
            effect="light"
          >
            <el-button :icon="Reading" />
          </el-tooltip>
        </router-link>
        <router-link
          class="item"
          to="/user"
        >
          <el-tooltip
            content="用户"
            placement="top"
            effect="light"
          >
            <el-button :icon="User" />
          </el-tooltip>
        </router-link>
        <el-badge
          :value="12"
          class="item"
        >
          <router-link to="/project/list">
            <el-button :icon="Search"> 全部项目 </el-button>
          </router-link>
        </el-badge>
        <el-badge
          :value="12"
          class="item"
        >
          <el-button
            type="primary"
            :icon="Star"
          >进行中项目</el-button>
        </el-badge>
        <el-badge
          :value="12"
          class="item"
        >
          <el-button
            type="success"
            :icon="CircleCheckFilled"
          >完成项目</el-button>
        </el-badge>
      </div>
      <!-- 用户操作 -->
      <div class="user-edit">
        <el-popconfirm
          title="确定退出登录?"
          @confirm="handleOut"
        >
          <template #reference>
            <el-button
              type="danger"
              :icon="SwitchButton"
            />
          </template>
        </el-popconfirm>
      </div>
    </el-space>
  </el-card>
</template>
<style lang="scss" scoped>
.navbar {
  // background-image: url("./assets/banner.jpg");
  // background-repeat: no-repeat;
  // background-size: cover;
  // background-position: center center;
  ::v-deep(.el-card__body) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user {
      .user-info {
        font-size: 14px;
        .el-tag {
          margin-bottom: 18px;
          & + .el-tag {
            margin-left: 12px;
          }
        }
      }
    }
    .user-project {
      .item {
        margin-right: 24px;
      }
    }
  }
}
</style>
