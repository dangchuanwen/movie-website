<template>
  <div class="video-page-wrapper flex f-d-c f-ai-c">
    <video-module></video-module>
    <plot-module></plot-module>
    <language-module></language-module>
  </div>
</template>

<script>
import VideoModule from "./modules/VideoModule";
import PlotModule from "./modules/PlotModule";
import LanguageModule from "./modules/LanguageModule";
export default {
  name: "VideoPage",
  components: {
    VideoModule,
    PlotModule,
    LanguageModule
  }
};
</script>

<style scoped lang="less">
.video-page-wrapper {
  width: 375px;
  height: 100vh;
  background: #1d2031;
}
</style>
