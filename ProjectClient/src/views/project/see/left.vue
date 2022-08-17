<script>
import { rulesT } from "tqr";
export default {
  name: "info",
  props: {
    form: rulesT.Object,
  },
  components: {},
  setup(props) {
    const { form } = props;
    return { form };
  },
};
</script>

<template>
  <div class="project-left">
    <el-image
      class="avatar"
      :src="form.avatar.length ? form.avatar[0].filePath : ''"
      fit="cover"
    />
    <div class="name">{{ form.name }}</div>
    <div class="time">项目时间：{{ form.developTime.join(" 至 ") }}</div>
    <el-divider />
    <div v-for="(i, j) in form.personnel" :key="j" class="personnel">
      <el-tag :type="i.type">{{ i.label }}</el-tag>
      <div class="item">
        <el-card
          v-for="(x, y) in i.children"
          :key="y"
          shadow="always"
          :body-style="{ padding: '0' }"
        >
          <el-image
            style="width: 60px; height: 60px"
            :src="x.avatar || ''"
            fit="cover"
          />
          <div class="personnel-name">{{ x.name }}</div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-left {
  .avatar {
    width: 100%;
    max-height: 140px;
  }
  .name {
    text-align: center;
    font-size: 16px;
    line-height: 1.6;
    font-weight: 600;
    padding: 9px 0;
  }
  .time {
    text-align: center;
    font-size: 14px;
    line-height: 1.6;
  }
  .el-divider {
    margin: 12px;
  }
  .personnel {
    padding: 6px 0;
    .el-tag {
      margin-bottom: 12px;
    }
    .item {
      display: flex;
      flex-wrap: wrap;
      .el-card {
        margin-right: 12px;
        .el-image {
          display: block;
        }
        .personnel-name {
          line-height: 1;
          padding: 3px;
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
}
</style>