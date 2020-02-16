<template>
  <div class="search-module-wrapper flex f-ai-c f-jc-sb">
    <search-component :link_url="'/search'"></search-component>
    <watch-history-component :link_url="'/history'"></watch-history-component>
  </div>
</template>

<script>
import SearchComponent from "./components/Search";
import WatchHistoryComponent from "./components/WatchHistory";
export default {
  name: "SearchModule",
  components: {
    SearchComponent,
    WatchHistoryComponent
  },
  methods: {}
};
</script>

<style scoped lang="less">
.search-module-wrapper {
  margin: 5px auto;
  width: 340px;
  height: 40px;
}
</style>
