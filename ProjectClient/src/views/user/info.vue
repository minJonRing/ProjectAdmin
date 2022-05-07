<script>
import Upload from "@/views/upload/index.vue";
import { reactive } from "vue";
import { rulesT } from "tqr";
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
    // 用户信息
    let form = reactive({
      username: "",
      password: "",
      name: "",
      type: [],
      avatar: "",
    });
    // 返回用户的数据
    const returnData = () => {
      return form.value;
    };
    return {
      // 数据
      userType,
      form,
      returnData,
    };
  },
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
