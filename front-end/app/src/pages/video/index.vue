<template>
  <div class="video-page-wrapper flex f-d-c f-ai-c">
    <video-module></video-module>
    <plot-module></plot-module>
  </div>
</template>

<script>
import VideoModule from "./modules/VideoModule";
import PlotModule from "./modules/PlotModule";
export default {
  name: "VideoPage",
  components: {
    VideoModule,
    PlotModule
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
