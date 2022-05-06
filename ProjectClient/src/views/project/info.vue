<script setup>
import Upload from "@/views/upload/index.vue";
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="项目名称">
      <el-input
        type="textarea"
        rows="3"
        v-model="form.name"
        placeholder="请输入"
      />
    </el-form-item>
    <el-form-item label="封面">
      <Upload url="/upload/img" />
    </el-form-item>
    <el-form-item label="资料">
      <Upload />
    </el-form-item>
    <el-form-item label="开发人员">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  .card {
    .avatar {
      display: block;
      width: 100%;
    }
  }
}
</style>
