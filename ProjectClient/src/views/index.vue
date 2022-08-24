<template>
  <!-- <router-view :key="key" /> -->
  <keep-alive>
    <router-view />
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
