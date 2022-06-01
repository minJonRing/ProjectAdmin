<script>
import { reactive, ref, onMounted } from "vue";
import { rulesT } from "tqr";
import { blur, change } from "tqr";
import { useDetail, useSearch } from "@/hooks";
import { useRoute, useRouter } from "vue-router";
import { Upload } from "@element-plus/icons-vue";
export default {
  name: "info",
  props: {
    questionIds: rulesT.Object,
  },
  components: {
    Upload,
  },
  setup(props) {
    const {
      questionIds: { itemId, projectId },
    } = props;
    console.log(itemId, projectId);
    const { handleDetail, submit } = useDetail("/project/question");
    const {
      search,
      handleSearch,
      handleReset,
      table,
      pagination,
      handleCurrentChange,
      handleSizeChange,
      handleDelete,
    } = useSearch({
      url: "/project/question",
      searchParam: {
        projectId,
        name: "",
        status: "",
      },
    });

    // // 新增、编辑、删除数据
    const formRef = ref(null);

    const form = ref({
      itemId,
      projectId,
      name: "",
      describe: "",
      treat: "",
      propose: "",
      solve: "",
      confirm: "",
      status: 0,
    });

    const rules = ref({
      name: blur,
      describe: blur,
      treat: blur,
    });

    const handleSee = (data) => {};

    const handleSubmit = () => {
      formRef.value.validate((valid, fields) => {
        if (valid) {
          console.log(form.value);
          return;
          submit({
            ...form.value,
          });
        } else {
          console.log("表单验证失败!", fields);
        }
      });
    };
    // 页面显示
    const addScreen = ref(false);
    // 挂载完成
    onMounted(() => {});
    // 添加项目

    return {
      search,
      handleSearch,
      handleReset,
      table,
      pagination,
      handleCurrentChange,
      handleSizeChange,
      handleDelete,
      handleSee,
      addScreen,
      //
      formRef,
      form,
      rules,
      handleSubmit,
    };
  },
};
</script>

<template>
  <div :class="['question', addScreen ? 'add' : '']">
    <div class="left" @click.stop="addScreen = false">
      <el-form class="search" :model="search" inline>
        <el-form-item label="名称">
          <el-input v-model="search.name" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="search.name" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="table" border stripe>
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="status" label="状态" width="80" />
        <el-table-column prop="propose" label="提出人" />
        <el-table-column prop="solve" label="修改人" />
        <el-table-column prop="confirm" label="确认人" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="text" @click="handleSee(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding: 18px 0">
        <el-pagination
          small
          background
          layout="total, sizes, prev, pager, next, jumper"
          :currentPage="pagination.currentPage"
          :page-size="pagination.pageSize"
          :total="pagination.pageTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div class="right">
      <div v-if="!addScreen" class="handle-add">
        <el-button plain @click.stop="addScreen = true">
          <el-icon><Upload /></el-icon>
          <div>新增问题</div>
        </el-button>
      </div>
      <el-form
        v-else
        :model="form"
        ref="formRef"
        :rules="rules"
        :inline="false"
        label-width="70px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input
            :rows="2"
            type="textarea"
            v-model="form.describe"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item v-if="form.status == 1" label="处理方法" prop="treat">
          <el-input
            :rows="2"
            type="textarea"
            v-model="form.treat"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button @click.stop="addScreen = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question {
  display: flex;
  .search {
    height: 42px;
    overflow: hidden;
  }
  &.add {
    .left {
      width: 600px;
    }
    .right {
      width: 600px;
    }
  }
  .left {
    width: 900px;
    transition-duration: 600ms;
    padding-right: 18px;
  }
  .right {
    width: 300px;
    padding-left: 18px;
    transition-duration: 600ms;
    border-left: 1px #dfdfdf solid;
    .handle-add {
      display: flex;
      align-items: center;
      justify-content: center;
      height: calc(100% - 18px);
      box-sizing: border-box;
      .el-button {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>