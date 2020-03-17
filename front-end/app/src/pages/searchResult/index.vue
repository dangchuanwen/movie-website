<template>
  <div class="search-result-page">
    <match-result-module></match-result-module>
  </div>
</template>

<script>
import MatchResultModule from "./modules/MatchResultModule/index";
export default {
  name: "SearchResultPage",
  components: {
    MatchResultModule
  }
};
</script>

<style scoped lang="less">
.search-result-page {
  width: 100vw;
  min-height: 100vh;
  background: #1d2031;
}
</style>
