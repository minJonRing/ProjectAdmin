<script>
import { reactive, ref, onMounted } from "vue";
import { blur, change } from "tqr";
import { useDetail } from "@/hooks";
import { useRoute, useRouter } from "vue-router";
import Left from "./see/left.vue";
export default {
  name: "info",
  components: {
    Left,
  },
  setup(props) {
    return {};
  },
};
</script>

<template>
  <div class="project-jc">
    <el-row :gutter="20">
      <el-col :span="5">
        <Left />
      </el-col>
      <el-col :span="19"></el-col>
    </el-row>
  </div>
</template>