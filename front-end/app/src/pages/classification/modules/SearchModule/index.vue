<template>
  <div class="search-module-wrapper flex f-ai-c">
    <span class="title">电影分类</span>
    <search-input
      class="search-input-wrapper"
      placeholder="搜你想看的影片"
      @handleInput="handleInput"
    >
      <template v-slot:icon>
        <i class="iconfont icon-xingqiu"></i>
      </template>
    </search-input>
    <a class="iconfont icon-zhongbiao" data-link="/history"></a>
    <i class="iconfont icon-fenxiang"></i>
  </div>
</template>

<script>
import SearchInput from "./components/SearchInput.vue";
export default {
  name: "SearchModule",
  components: {
    SearchInput
  },
  methods: {
    handleInput() {
      this.$router.push({
        path: "/search"
      });
    }
  }
};
</script>

<style scoped lang="less">
.search-module-wrapper {
  width: 375px;
  height: 60px;
  background: #1d2031;
  .title {
    margin: 0 10px;

    color: #888888;
    font-size: 20px;
  }
  .search-input-wrapper {
    background: #202533;
  }
  .icon-zhongbiao,
  .icon-fenxiang {
    margin: 0 10px;
    color: #888888;
    font-size: 20px;
  }
}
</style>
