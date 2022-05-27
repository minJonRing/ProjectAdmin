<script>
import { reactive, ref, onMounted } from "vue";
import { userType } from "@/zd";
import { blur, change } from "tqr";
import { useDetail } from "@/hooks";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "info",
  components: {},
  setup(props) {
    let form = ref({
      name: "",
      developTime: [],
      avatar: [],
      fileList: [],
      personnel: [],
    });
    const route = useRoute();
    const router = useRouter();
    const { handleDetail, submit } = useDetail("/project");
    onMounted(() => {
      const { id } = route.query;
      id &&
        handleDetail(id).then((data) => {
          const { personnel } = data;
          form.value = {
            ...data,
            personnel: userType.map((i) => {
              const children = personnel.filter(({ type }) => type == i.value);
              return {
                ...i,
                children,
              };
            }),
          };
          console.log(form.value);
        });
    });

    return {
      form,
    };
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
    <div class="time">{{ form.developTime.join(" 至 ") }}</div>
    <div v-for="(i, j) in form.personnel" :key="j">
      <el-tag :type="i.type">{{ i.label }}</el-tag>
      <div>
        <el-card
          class="personnel"
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
          <div>{{ x.name }}</div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-left {
  .avatar {
    width: 100%;
  }
  .name {
    text-align: center;
    font-size: 16px;
    line-height: 1.6;
    font-weight: 600;
    padding: 18px 0;
  }
  .time {
    text-align: center;
    font-size: 14px;
    line-height: 1.6;
  }
}
</style>