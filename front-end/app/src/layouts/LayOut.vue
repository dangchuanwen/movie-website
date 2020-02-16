<template>
  <div>
    <router-view></router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from "./TabBar.vue";
export default {
  name: "LayOut",
  components: {
    TabBar
  }
};
</script>

<style scoped lang="less"></style>
