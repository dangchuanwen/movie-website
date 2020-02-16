<template>
  <div class="history-page-wrapper">
    <title-module></title-module>
    <history-list-module></history-list-module>
  </div>
</template>

<script>
import HistoryListModule from "./modules/HistoryListModule";
import TitleModule from "./modules/TitleModule";
export default {
  name: "WatchHistoryPage",
  components: {
    HistoryListModule,
    TitleModule
  }
};
</script>

<style scoped lang="less">
.history-page-wrapper {
  box-sizing: border-box;
  width: 375px;
  height: 100vh;
  padding: 0 10px;
  background: #1d2031;
  overflow-y: scroll;
}
</style>
