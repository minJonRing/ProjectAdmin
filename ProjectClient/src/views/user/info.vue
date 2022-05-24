<script>
import Upload from "@/views/upload/index.vue";
import { reactive, ref } from "vue";
import { rulesT, blur, change } from "tqr";
import { userType } from "@/zd";
// do not use same name with ref
export default {
  name: "User",
  props: {
    id: rulesT.Number,
  },
  components: {
    Upload,
  },
  setup(props) {
    const { id } = props;
    const formRef = ref(null);
    // 用户信息
    let form = reactive({
      username: "",
      password: "",
      name: "",
      type: [],
      avatar: "",
    });

    const rules = reactive({
      username: [
        blur,
        { min: 5, max: 10, message: "长度在5-10之间", trigger: "blur" },
      ],
      password: [
        blur,
        { min: 6, max: 16, message: "长度在6-16之间", trigger: "blur" },
      ],
      name: [
        blur,
        { min: 2, max: 8, message: "长度在2-8之间", trigger: "blur" },
      ],
      type: change,
    });
    // 返回用户的数据
    const returnData = () => {
      return new Promise((r, j) => {
        formRef.value.validate((valid, fields) => {
          if (valid) {
            r(form);
          } else {
            console.log("表单验证失败!");
            j("表单验证失败!");
          }
        });
      });
    };
    return {
      userType,
      // 数据
      formRef,
      form,
      rules,
      returnData,
    };
  },
};
</script>

<template>
  <el-form
    class="info"
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="80px"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="form.username" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="form.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox
          v-for="item in userType"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="头像">
      <Upload url="/upload/img" />
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
</style>
