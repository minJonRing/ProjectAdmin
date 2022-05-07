<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useStore } from "vuex";
import avatar from "@/assets/user.jpg";
import {
  User,
  Plus,
  Search,
  Star,
  CircleCheckFilled,
  SwitchButton,
} from "@element-plus/icons-vue";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const userInfo = store.state.user.userInfo;
    const handleOut = () => {
      console.log(1);
    };
    return {
      // 图标
      User,
      Plus,
      Search,
      Star,
      CircleCheckFilled,
      SwitchButton,
      //
      userInfo,
      avatar,
      // 退出登录
      handleOut,
    };
  },
};
</script>

<template>
  <el-container class="app">
    <el-header class="layout-head">
      <el-card shadow="always" :body-style="{ padding: '18px' }">
        <!-- 头像 用户信息 -->
        <el-space size="large" class="user">
          <el-avatar
            shape="square"
            :size="80"
            fit="cover"
            :src="userInfo?.avatar || avatar"
          />
          <div class="user-info">
            <el-tag>前端</el-tag>
            <div>{{ userInfo.name }}</div>
          </div>
        </el-space>
        <!-- 项目进程 -->
        <el-space size="large" class="user">
          <div class="user-project">
            <router-link class="item" to="/user">
              <el-tooltip content="用户" placement="top" effect="light">
                <el-button :icon="User" />
              </el-tooltip>
            </router-link>
            <router-link class="item" to="/project/add">
              <el-tooltip content="新增项目" placement="top" effect="light">
                <el-button :icon="Plus" />
              </el-tooltip>
            </router-link>
            <el-badge :value="12" class="item">
              <el-button :icon="Search">全部项目</el-button>
            </el-badge>
            <el-badge :value="12" class="item">
              <el-button type="primary" :icon="Star">进行中项目</el-button>
            </el-badge>
            <el-badge :value="12" class="item">
              <el-button type="success" :icon="CircleCheckFilled"
                >完成项目</el-button
              >
            </el-badge>
          </div>
          <!-- 用户操作 -->
          <div class="user-edit">
            <el-popconfirm title="确定退出登录?" @confirm="handleOut">
              <template #reference>
                <el-button type="danger" :icon="SwitchButton" />
              </template>
            </el-popconfirm>
          </div>
        </el-space>
      </el-card>
    </el-header>
    <el-main class="layout-main">
      <el-card shadow="always" :body-style="{ padding: '18px' }">
        <router-view />
      </el-card>
    </el-main>
  </el-container>
</template>
<style lang="scss">
@import "./app.scss";
</style>
<style lang="scss" scoped>
.app {
  height: 100%;
  background-color: #f8f8f8;
  .layout-head {
    height: auto;
    padding: 12px;
    .el-card {
      ::v-deep(.el-card__body) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user {
          .user-info {
            font-size: 14px;
            .el-tag {
              margin-bottom: 18px;
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
  }
  .layout-main {
    padding: 0 12px 12px;
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
