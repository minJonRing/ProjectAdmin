<script>
import Upload from "@/views/upload/index.vue";
import { reactive, ref, onMounted, onBeforeUnmount, shallowRef } from "vue";
import { blur, change } from "tqr";
import { useDetail } from "@/hooks";
import ajax from "@/request/index.js";
import { useRoute, useRouter } from "vue-router";
// do not use same name with ref
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { getToken } from "@/utils/token";
export default {
  name: "info",
  components: {
    Upload,
    Editor,
    Toolbar,
  },
  setup(props) {
    // 用户信息
    let form = reactive({
      cover: [],
      title: "",
      type: [99],
      cont: "",
    });

    const rules = reactive({
      cover: blur,
      title: blur,
      type: change,
      cont: blur,
    });

    const { handleDetail, submit } = useDetail("/article");
    const route = useRoute();
    const router = useRouter();
    onMounted(() => {
      const { id } = route.query;
      id &&
        handleDetail(id).then((data) => {
          const keys = Object.keys(data);
          keys.map((key) => (form[key] = data[key]));
        });
    });

    const formRef = ref(null);

    // 返回用户的数据
    const handleSubmit = (back) => {
      return new Promise((r, j) => {
        formRef.value.validate((valid, fields) => {
          if (valid) {
            submit({ ...form }).then((data) => {
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
    // 编辑器实例,必须用 shallowRef
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML

    const toolbarConfig = {};
    const editorConfig = {
      placeholder: "请输入内容...",
      MENU_CONF: {
        uploadImage: {
          customUpload: async (file, insertFn) => {
            const isType =
              ["image", "jpg", "jpeg", "png"].filter((i) => {
                return (
                  new RegExp(i).test(file.type) ||
                  i === file.name.replace(/.+(?=\.)|\./g, "")
                );
              }).length > 0;
            const isSize = file.size / 1024 / 1024 < 50;
            if (!isType) {
              ElNotification.error(
                `请上传格式正确的文件,${this.type.join(",")}!`
              );
              return;
            }
            if (!isSize) {
              ElNotification.error(`上传文件大小不能超过${this.size}MB!`);
              return;
            }
            let formData = new FormData();
            formData.append("file", file);
            ajax({
              url: "/upload/img",
              method: "POST",
              data: formData,
            })
              .then(({ data }) => {
                for (let el of data) {
                  const { fileName, filePath } = el;
                  insertFn(filePath, fileName, filePath);
                }
              })
              .finally(() => {
                // this.$global.loading = false;
              });
          },
        },
      },
    };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    return {
      // 数据
      formRef,
      form,
      rules,
      handleSubmit,
      // 编辑器实例
      editorRef,
      mode: "default", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
    };
  },
};
</script>

<template>
  <div class="article-info">
    <el-scrollbar height="100%">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="封面" prop="cover">
          <Upload v-model="form.cover" url="/upload/img" one />
        </el-form-item>
        <el-form-item label="文章名称" prop="title">
          <el-input
            type="textarea"
            rows="3"
            v-model="form.title"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select
            v-model="form.type"
            multiple
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in [{ value: 99, label: '其他' }]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="cont">
          <div style="border: 1px solid #ccc">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="height: 300px; overflow-y: hidden"
              v-model="form.cont"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
          <router-link class="ml10" to="list">
            <el-button> 返回 </el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.article-info {
  height: 100%;
  .el-scrollbar {
    padding-right: 12px;
  }
}
</style>
