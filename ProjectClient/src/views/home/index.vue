<script>
import { ref } from 'vue'
export default {
  setup() {}
}
</script>

<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="6"
      >
        <el-card
          shadow="always"
          :body-style="{ padding: '0px' }"
        >
          <div class="card">
            <img
              class="avatar"
              src=""
              alt="封面"
            >
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  .card {
    .avatar {
      display: block;
      width: 100%;
    }
  }
}
</style>
