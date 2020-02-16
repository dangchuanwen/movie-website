<template>
  <a class="watch-history-wrapper flex f-ai-c f-jc-fe" :data-link="link_url">
    <i class="iconfont icon-zhongbiao1"></i>
  </a>
</template>

<script>
export default {
  name: "WatchHistoryComponent",
  props: {
    link_url: {
      type: String,
      default: () => ""
    }
  },
  methods: {}
};
</script>

<style scoped lang="less">
.watch-history-wrapper {
  width: 71px;
  height: 100%;
  .icon-zhongbiao1 {
    margin-right: 10px;
    font-size: 22px;
    color: white;
  }
}
</style>
