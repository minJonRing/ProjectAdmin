<script setup>
import Info from "./info.vue";
import { reactive, ref } from "vue";

// do not use same name with ref
const search = reactive({
  username: "",
  name: "",
});

const onSubmit = () => {
  console.log("submit!");
};

const dialogVisible = ref(false);
</script>

<template>
  <div class="user">
    <el-form class="search" :model="search" inline>
      <el-form-item label="账号">
        <el-input v-model="search.username" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="search.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="edits">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>
    <div style="padding: 18px 0">
      <el-table :data="[]" border stripe>
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="type" label="类型" />
        <el-table-column label="操作" width="160"></el-table-column>
      </el-table>
    </div>
    <el-pagination
      small
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="500"
    />
    <el-dialog v-model="dialogVisible" title="用户" width="600px">
      <Info />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.user {
  ::v-deep(.el-overlay) {
    .el-overlay-dialog {
      .el-dialog {
        .el-dialog__header {
          padding-top: 12px;
        }
        .el-dialog__body {
          padding: 12px;
          border-top: 1px #f1f1f1 solid;
          border-bottom: 1px #f1f1f1 solid;
        }
        .el-dialog__footer {
          padding: 12px;
        }
        .el-dialog__headerbtn {
          top: 0;
        }
      }
    }
  }
}
</style>
