<template>
  <keep-alive>
    <router-view :key="key" />
  </keep-alive>
</template>

<script>
export default {
  name: "Index",
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>
