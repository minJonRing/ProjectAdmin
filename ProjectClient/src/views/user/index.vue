<script>
import Info from "./info.vue";
import { ref, watch } from "vue";
import { useSearch, useDetail } from "@/hooks";
import ajax from "@/request";
import { userType } from "@/zd";
export default {
  name: "User",
  components: {
    Info,
  },
  setup() {
    const {
      search,
      handleSearch,
      handleReset,
      table,
      pagination,
      handleCurrentChange,
      handleSizeChange,
    } = useSearch({
      url: "/user",
      searchParam: {
        username: "",
        name: "",
      },
    });

    const { detail, handleDetail, submit } = useDetail("/user/add");
    // 详情页面
    const infoRef = ref(null);
    // 是否显示
    const dialogVisible = ref(false);
    // 添加、修改
    const handleSubmit = () => {
      infoRef.value.returnData().then((data) => {
        data &&
          submit(data).then(() => {
            handleSearch();
            dialogVisible.value = false;
          });
      });
    };
    // 返回用户状态
    const returnType = (data) => {
      console.log([...data]);
      return userType
        .filter(({ value, label }) => {
          return [...data].includes(value);
        })
        .map(({ label }) => label)
        .join("，");
    };
    return {
      infoRef,
      search,
      handleSearch,
      handleReset,
      table,
      pagination,
      handleCurrentChange,
      handleSizeChange,
      // 添加
      dialogVisible,
      handleSubmit,
      returnType,
    };
  },
};
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
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="edits">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>
    <div style="padding: 18px 0">
      <el-table :data="table" border stripe>
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="username" label="账号" />
        <el-table-column prop="type" label="类型">
          <template #default="{ row }">
            <div style="display: flex; align-items: center">
              {{ returnType(row.type) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160"></el-table-column>
      </el-table>
    </div>
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
    <el-dialog v-model="dialogVisible" title="用户" width="600px">
      <Info ref="infoRef" :id="1" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click.stop="handleSubmit">
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
