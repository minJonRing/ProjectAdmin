<script>
import Info from "./info.vue";
import { ref } from "vue";
import { useSearch } from "@/hooks";
export default {
  name: "article",
  components: {
    Info,
  },
  setup() {
    // 列表查询
    const {
      search,
      handleSearch,
      handleReset,
      table,
      handleDelete,
      pagination,
      handleCurrentChange,
      handleSizeChange,
    } = useSearch({
      url: "/article",
      searchParam: {
        title: "",
      },
    });
    console.log(table);

    return {
      search,
      handleSearch,
      handleReset,
      table,
      handleDelete,
      pagination,
      handleCurrentChange,
      handleSizeChange,
    };
  },
};
</script>

<template>
  <div class="article">
    <el-form class="search" :model="search" inline>
      <el-form-item label="名称">
        <el-input v-model="search.name" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="edits">
      <router-link to="add">
        <el-button type="primary">添加</el-button>
      </router-link>
    </div>
    <div class="box">
      <el-card
        class="box-card"
        v-for="(i, j) in table"
        :key="j"
        :body-style="{ padding: '0px' }"
      >
        <div class="card-cont">
          <el-image
            style="width: 180px; height: 160px"
            :src="i.cover.length ? i.cover[0].filePath : ''"
            fit="cover"
          />
          <div class="info">
            <div class="name">{{ i.title }}</div>
            <div class="time">{{ i.createTime.replace(/T.+/g, "") }}</div>
            <div class="edit">
              <router-link :to="`see?id=${i.id}`">
                <el-button type="text" @click.stop>查看</el-button>
              </router-link>
              <router-link :to="`edit?id=${i.id}`">
                <el-button type="text" @click.stop>编辑</el-button>
              </router-link>
              <el-button
                class="delete-btn"
                type="text"
                @click.stop="handleDelete(i.id)"
              >
                删除
              </el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article {
  .box {
    padding: 12px 0;
    display: flex;
    align-items: center;
    .el-card {
      margin: 6px;
      .card-cont {
        padding: 6px;
        .info {
          padding: 3px 0 0;
          .name {
            width: 180px;
            font-size: 13px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .time {
            font-size: 12px;
            padding: 6px 0;
          }
          .edit {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #f1f1f1;
          }
        }
      }
    }
  }
}
</style>
