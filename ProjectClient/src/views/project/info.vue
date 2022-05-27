<script>
import Upload from "@/views/upload/index.vue";
import { reactive, ref, onMounted } from "vue";
import { blur, change } from "tqr";
import { useDetail } from "@/hooks";
import ajax from "@/request/index.js";
import { useRoute, useRouter } from "vue-router";
// do not use same name with ref
export default {
  name: "info",
  components: {
    Upload,
  },
  setup(props) {
    // 用户信息
    let form = reactive({
      name: "",
      developTime: [],
      avatar: [],
      fileList: [],
      personnel: [],
    });

    const rules = reactive({
      name: blur,
      developTime: change,
      personnel: change,
    });

    const { handleDetail, submit } = useDetail("/project");
    const route = useRoute();
    const router = useRouter();
    onMounted(() => {
      getPersonnel();
      const { id } = route.query;
      id &&
        handleDetail(id).then((data) => {
          const keys = Object.keys(data);
          keys.map((key) => (form[key] = data[key]));
        });
    });

    const formRef = ref(null);

    const personnel = ref([]);

    const getPersonnel = () => {
      ajax({
        url: "/user",
        method: "get",
      }).then(({ data }) => {
        personnel.value = data.list.map(({ _id, name }) => ({
          value: _id,
          label: name,
        }));
        console.log(personnel);
      });
    };

    // 返回用户的数据
    const handleSubmit = (back) => {
      return new Promise((r, j) => {
        formRef.value.validate((valid, fields) => {
          if (valid) {
            submit(form).then((data) => {
              r(data);
              back && router.back("/");
            });
          } else {
            console.log("表单验证失败!", fields);
            j("表单验证失败!");
          }
        });
      });
    };
    return {
      personnel,
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
  <el-form
    class="project-info"
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="120px"
  >
    <el-form-item label="项目名称" prop="name">
      <el-input
        type="textarea"
        rows="3"
        v-model="form.name"
        placeholder="请输入"
      />
    </el-form-item>
    <el-form-item label="开发时间" prop="developTime">
      <el-date-picker
        v-model="form.developTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="封面">
      <Upload v-model="form.avatar" url="/upload/img" one />
    </el-form-item>
    <el-form-item label="资料">
      <Upload v-model="form.fileList" url="/upload/img" />
    </el-form-item>
    <el-form-item label="开发人员" prop="personnel">
      <el-select
        v-model="form.personnel"
        placeholder="请选择"
        clearable
        filterable
        multiple
        style="width: 100%"
      >
        <el-option
          v-for="item in personnel"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
      <router-link class="ml10" to="list">
        <el-button> 返回 </el-button>
      </router-link>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.project-info {
  max-width: 900px;
}
</style>
