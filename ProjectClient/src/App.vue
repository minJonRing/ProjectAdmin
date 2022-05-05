<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed } from "vue";
import router from "@/router/index";
import { useRoute } from "vue-router";
import user from "@/assets/user.jpg";

function onClickLeft() {
  router.back();
}
const nav = computed(() => {
  const route = useRoute();
  return {
    user,
  };
});
</script>

<template>
  <el-container class="app">
    <el-header class="layout-left">
      <el-space size="large" class="user">
        <el-avatar shape="square" :size="80" fit="cover" :src="user" />
        <el-descriptions class="info" column="1">
          <el-descriptions-item label="Username">
            用户姓名
          </el-descriptions-item>
          <el-descriptions-item label="Telephone">
            18100000000
          </el-descriptions-item>
        </el-descriptions>
      </el-space>
      <el-divider />
      <div class="list">
        <div class="item">
          <el-badge :value="12">
            <el-button type="text">项目1</el-button>
          </el-badge>
        </div>
        <div class="item">
          <el-badge :value="12">
            <el-button type="text">项目1</el-button>
          </el-badge>
        </div>
      </div>
    </el-header>
    <el-main class="layout-right">
      <router-view />
    </el-main>
  </el-container>
</template>

<style lang="scss">
@import "./app.scss";
.app {
  height: 100%;
  .layout-left {
    height: 120px;
    background: linear-gradient(-120deg, #fff, #a8e1ff);
    .user {
      width: 100%;
      padding-top: 10px;
      .info {
        font-size: 14px;
        background-color: transparent;
      }
    }
    .list {
      width: 100%;
      .item {
        width: 100%;
        background-color: #fff;
        margin-bottom: 18px;
        border-radius: 4px;
        .el-badge {
          width: 90%;
          .el-button {
            width: 100%;
            justify-content: start;
            padding-left: 12px;
          }
        }
      }
    }
  }
  .layout-right {
    padding: 12px;
    background-color: #fff;
  }
}
</style>
