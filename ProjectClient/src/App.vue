<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { reactive, ref } from "vue";
import { mapGetters, useStore } from "vuex";
import avatar from "@/assets/user.jpg";
import { deleteToken } from "@/utils/token";
import { ElNotification } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { ArrowDown, Operation } from "@element-plus/icons-vue";
import { userType } from "@/zd";
import {
  User,
  Plus,
  Search,
  Star,
  CircleCheckFilled,
  SwitchButton,
  Reading,
} from "@element-plus/icons-vue";

export default {
  name: "App",
  components: {
    ArrowDown,
    Operation,
  },
  computed: {
    ...mapGetters(["loading", "userInfo"]),
    returnUserType() {
      const value = userType.map(({ value }) => value);
      return (this.userInfo.type || []).map((i) => {
        const index = value.indexOf(i);
        return userType[index];
      });
    },
  },
  setup() {
    const store = useStore();

    const router = useRouter();
    const handleOut = () => {
      deleteToken("token");
      store.dispatch("user/resetToken");
      ElNotification.success("退出成功");
      router.push("/login");
    };
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
      sysTitle: "开发系统",
      // 退出登录
      handleOut,
    };
  },
  watch: {
    userInfo(data) {
      console.log(data);
    },
  },
};
</script>

<template>
  <el-container class="app">
    <el-header class="layout-head">
      <el-card shadow="always" :body-style="{ padding: '18px' }">
        <!-- 头像 用户信息 -->
        <el-space size="large" class="user">
          <el-image
            style="width: 60px; height: 60px"
            :src="userInfo ? userInfo.avatar : avatar"
            fit="cover"
          />
          <div class="user-info">
            <el-tag v-for="i in returnUserType" :type="i.type" :key="i">
              {{ i.label }}
            </el-tag>
            <div>{{ userInfo.name || `欢迎访问${sysTitle}` }}</div>
          </div>
        </el-space>
        <!-- 项目进程 -->
        <el-row>
          <el-col hidden-sm-only :xs="0" :sm="24">
            <el-space v-if="userInfo.name" size="large" class="user">
              <div class="user-project">
                <router-link class="item" to="/article/list">
                  <el-tooltip content="文章" placement="top" effect="light">
                    <el-button :icon="Reading" />
                  </el-tooltip>
                </router-link>
                <router-link class="item" to="/user">
                  <el-tooltip content="用户" placement="top" effect="light">
                    <el-button :icon="User" />
                  </el-tooltip>
                </router-link>
                <el-badge :value="12" class="item">
                  <router-link to="/project/list">
                    <el-button type="primary" :icon="Search">
                      我的项目
                    </el-button>
                  </router-link>
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
          </el-col>
          <el-col :sm="0" :xs="24">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon style="font-size: 30px">
                  <Operation />
                </el-icon>
                <el-icon class="el-icon--right">
                  <ArrowDown />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <router-link class="item" to="/article/list">
                      <el-button text :icon="Reading">文章</el-button>
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item divided>
                    <router-link to="/project/list">
                      <el-button type="primary" text :icon="Search">
                        我的项目
                      </el-button>
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item divided>
                    <el-button
                      type="danger"
                      text
                      :icon="SwitchButton"
                      @confirm="handleOut"
                      >退出</el-button
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-card>
    </el-header>
    <el-main class="layout-main" v-loading="loading">
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
    padding: 0;

    .el-card {
      // background-image: url("./assets/banner.jpg");
      // background-repeat: no-repeat;
      // background-size: cover;
      // background-position: center center;
      :deep(.el-card__body) {
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
  }
  .layout-main {
    padding: 12px 0 0;
    overflow: hidden;
    .el-card {
      height: 100%;
      :deep(.el-card__body) {
        height: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
