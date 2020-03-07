<template>
  <div class="video-module-wrapper">
    <video-container-component
      v-if="program.src"
      :src="program.src"
      :poster="program.poster_url"
    ></video-container-component>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VideoContainerComponent from "./components/VideoContainer";
export default {
  name: "VideoModule",
  components: {
    VideoContainerComponent
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      program: state => state.video.video_module.program_info
    })
  },
  mounted() {
    const { id, belong } = this.$route.query;
    this.getProgramInfo({ id, belong });
  },
  methods: {
    ...mapActions({
      getProgramInfo: "video/video_module/getProgramInfo"
    })
  }
};
</script>

<style scoped lang="less">
.video-module-wrapper {
  width: 100%;
}
</style>
