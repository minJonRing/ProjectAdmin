<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { blur } from "tqr";
export default {
  name: "info",
  setup(props) {
    let form = ref({
      username: "",
      password: "",
    });
    const rules = ref({
      username: blur,
      password: blur,
    });

    const handleLogin = () => {};

    onMounted(() => {});

    return {
      form,
      rules,
    };
  },
};
</script>

<template>
  <div class="login">
    <el-form :model="form" ref="form" :rules="rules" label-width="60px">
      <el-form-item label="欢迎登录" />
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" style="width: 100%">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-image: url("../../assets/login.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .el-form {
    width: 400px;
    background-color: rgba(255, 255, 255, 1);
    padding: 28px 28px 10px;
    border-radius: 4px;
    margin-top: -160px;
  }
}
</style>