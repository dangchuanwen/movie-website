<template>
  <a class="sub-title-wrapper flex f-ai-c" v-if="title" :data-link="link_url">
    <span class="title">{{ title }}</span>
    <i class="iconfont icon-ziyuan"></i>
  </a>
</template>

<script>
export default {
  props: {
    link_url: {
      type: String,
      default: () => ""
    },
    title: {
      type: String,
      default: () => ""
    }
  },
  name: "SubTitleComponent"
};
</script>

<style scoped lang="less">
.sub-title-wrapper {
  width: 100%;
  height: 30px;
  font-weight: bold;
  color: #888888;
  .title {
    margin-right: 8px;
    font-size: 16px;
  }
  .icon-ziyuan {
    margin-top: 3px;
    font-size: 12px;
  }
}
</style>
