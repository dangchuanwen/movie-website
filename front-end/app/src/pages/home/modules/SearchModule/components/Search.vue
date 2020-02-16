<template>
  <a class="search-wrapper flex f-ai-c" :data-link="link_url">
    <i class="iconfont icon-chaxun"></i>
    <span class="placeholder">搜索你想要的内容</span>
  </a>
</template>

<script>
export default {
  name: "SearchComponent",
  props: {
    link_url: {
      type: String,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="less">
.search-wrapper {
  box-sizing: border-box;
  padding: 3px 8px;
  width: 266px;
  height: 35px;
  border-radius: 20px;
  background: #202533;
  .icon-chaxun {
    color: #888888;
  }
  .placeholder {
    margin-left: 5px;
    color: #888888;
    font-size: 11px;
  }
}
</style>
