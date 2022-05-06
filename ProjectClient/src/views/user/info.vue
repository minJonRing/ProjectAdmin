<script setup>
import Info from "./info.vue";
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  username: "",
  password: "",
  name: "",
  type: "",
  avatar: "",
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<template>
  <el-form class="info" :model="form" label-width="80px">
    <el-form-item label="账号">
      <el-input v-model="form.username" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="用户名">
      <el-input v-model="form.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="类型">
      <el-input v-model="form.type" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="头像">
      <el-input v-model="form.avatar" placeholder="请输入" />
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.info {
}
</style>
