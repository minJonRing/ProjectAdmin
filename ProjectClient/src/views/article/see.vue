<script>
import { ref, onMounted, reactive } from "vue";
import { useDetail } from "@/hooks";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "info",
  setup(props) {
    let form = reactive({
      cover: [],
      title: "",
      type: [],
      cont: "",
      createTime: "",
    });
    const route = useRoute();
    const router = useRouter();
    const { handleDetail } = useDetail("/article");

    const handleReturn = () => {
      router.push("/article/list");
    };

    onMounted(() => {
      const { id } = route.query;
      id &&
        handleDetail(id).then((data) => {
          const keys = Object.keys(data);
          keys.map((key) => (form[key] = data[key]));
        });
    });

    return {
      form,
      handleReturn,
    };
  },
};
</script>

<template>
  <el-scrollbar height="100%">
    <div class="article-see">
      <div
        class="banner"
        :style="{
          backgroundImage: `url(${
            form.cover[0] ? form.cover[0].filePath : ''
          })`,
        }"
      >
        <el-button class="return-btn" @click="handleReturn">返回</el-button>
      </div>
      <div class="title">{{ form.title }}</div>
      <span class="time">{{ form.createTime.replace(/T.+/g, "") }}</span>
      <div class="cont" v-html="form.cont"></div>
    </div>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.article-see {
  .banner {
    position: relative;
    background-size: cover;
    height: 160px;
    .return-btn {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    padding-top: 18px;
  }
  .time {
    display: block;
    text-align: center;
    font-size: #dfdfdf;
    padding: 18px 0;
    font-size: 12px;
  }
}
</style>