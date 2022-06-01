<script>
import { ref, onMounted } from "vue";
import { useDetail } from "@/hooks";
import { userType } from "@/zd";
import { useRoute, useRouter } from "vue-router";
import Left from "./see/left.vue";
import Right from "./see/right.vue";
export default {
  name: "info",
  components: {
    Left,
    Right,
  },
  setup(props) {
    const over = ref(false);
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
            personnel: userType
              .map((i) => {
                const children = personnel.filter(({ type }) =>
                  type.includes(i.value)
                );
                return {
                  ...i,
                  children,
                };
              })
              .filter(({ children }) => !!children.length),
            personnelList: personnel,
          };
          over.value = true;
        });
    });

    return {
      form,
      over,
    };
  },
};
</script>

<template>
  <div class="project-jc">
    <el-row v-if="over" :gutter="20">
      <el-col :span="5">
        <Left :form="form" />
      </el-col>
      <el-col :span="19">
        <Right :db="form" />
      </el-col>
    </el-row>
  </div>
</template>