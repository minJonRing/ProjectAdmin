<script>
import Upload from "@/views/upload/index.vue";
import { watch, onMounted, reactive, ref } from "vue";
import { rulesT, blur, change } from "tqr";
import { userType } from "@/zd";
import { useDetail } from "@/hooks";
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
        { min: 2, max: 10, message: "长度在5-10之间", trigger: "blur" },
      ],
      password: [
        blur,
        { min: 6, max: 10, message: "长度在6-16之间", trigger: "blur" },
      ],
      name: [
        blur,
        { min: 2, max: 8, message: "长度在2-8之间", trigger: "blur" },
      ],
      type: change,
    });

    const { handleDetail, submit } = useDetail("/user");

    watch(props, (newProps) => {
      handleDetail(newProps.id).then((data) => {
        const keys = Object.keys(data);
        keys.map((key) => (form[key] = data[key]));
        form.avatar = form.avatar
          ? [{ fileName: "", filePath: data.avatar }]
          : [];
      });
    });

    onMounted(() => {
      const { id } = props;
      id &&
        handleDetail(id).then((data) => {
          const keys = Object.keys(data);
          keys.map((key) => (form[key] = data[key]));
          form.avatar = form.avatar
            ? [{ fileName: "", filePath: data.avatar }]
            : [];
        });
    });

    const formRef = ref(null);

    // 返回用户的数据
    const handleSubmit = () => {
      return new Promise((r, j) => {
        formRef.value.validate((valid, fields) => {
          if (valid) {
            const { avatar } = form;
            submit({
              ...form,
              avatar: avatar.length ? avatar[0].filePath : "",
            }).then((data) => {
              r(data);
            });
          } else {
            console.log("表单验证失败!", fields);
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
      handleSubmit,
    };
  },
};
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
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
      <Upload v-model="form.avatar" url="/upload/img" one />
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
</style>
