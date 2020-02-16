<template>
  <div class="home-page-wrapper flex f-d-c f-ai-c" ref="homePageWrapper">
    <div class="module-wrapper">
      <search-module></search-module>
      <banner-module></banner-module>
      <program-bar-module></program-bar-module>
      <watch-history-module></watch-history-module>
      <!-- <hot-module></hot-module> -->
      <recommend-module></recommend-module>
    </div>
  </div>
</template>

<script>
import SearchModule from "./modules/SearchModule";
import BannerModule from "./modules/BannerModule";
import ProgramBarModule from "./modules/ProgramBarModule";
// import HotModule from "./modules/HotModule";
import RecommendModule from "./modules/RecommendModule";
import WatchHistoryModule from "./modules/WatchHistoryModule";
export default {
  name: "HomePage",
  components: {
    SearchModule,
    BannerModule,
    ProgramBarModule,
    // HotModule,
    RecommendModule,
    WatchHistoryModule
  },
  data() {
    return {
      touchStart: {
        x: null,
        y: null
      },
      touchEnd: {
        x: null,
        y: null
      }
    };
  },
  mounted() {},
  methods: {},
  beforeDestroy() {
    // this.bScroll = null;
  }
};
</script>

<style scoped lang="less">
.home-page-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #1d2031;
  overflow-y: scroll;
  overflow-x: hidden;
  .module-wrapper {
    position: absolute;
    padding-top: 20px;
    padding-bottom: 70px;
    width: 100%;
    background: #1d2031;
  }
}
</style>
