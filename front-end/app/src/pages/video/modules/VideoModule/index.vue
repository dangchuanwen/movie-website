<template>
  <div class="video-module-wrapper">
    <video-container-component
      v-if="program.src"
      :src="program.src"
      :poster="program.poster_url"
      :currentTime="program.currentTime"
      @playerTimeUpdate="onPlayerTimeUpdate"
    ></video-container-component>
  </div>
</template>

<script>
import types from "./store/mutations-type";
import request from "@/utils/request";
import { mapState, mapActions, mapMutations } from "vuex";
import VideoContainerComponent from "./components/VideoContainer";
export default {
  name: "VideoModule",
  components: {
    VideoContainerComponent
  },
  data() {
    return {
      storeProgressPromise: null
    };
  },
  computed: {
    ...mapState({
      program: state => state.video.video_module.program_info
    })
  },
  watch: {
    $route() {
      this.getProgramInfo();
    }
  },
  mounted() {
    this.getProgramInfo();
  },
  beforeDestroy() {
    // 设置为空
    this.setProgramInfo({});
  },
  methods: {
    requestUpdateProgress({ currentTime, duration }) {
      return request({
        method: "get",
        url: "/api/storeProgress",
        params: {
          id: this.program.id,
          currentTime: Math.floor(currentTime),
          duration: Math.floor(duration)
        }
      });
    },
    async onPlayerTimeUpdate({ currentTime, duration }) {
      if (this.storeProgressPromise === null) {
        this.storeProgressPromise = this.requestUpdateProgress({
          currentTime,
          duration
        });
      } else {
        await this.storeProgressPromise;
        this.storeProgressPromise = this.requestUpdateProgress({
          currentTime,
          duration
        });
      }
    },
    getProgramInfo() {
      const { id } = this.$route.query;
      this.getOneOfTvPlayProgramInfo({ id });
    },
    ...mapMutations({
      setProgramInfo: `video/video_module/${types.SET_PROGRAM_INFO}`
    }),
    ...mapActions({
      getOneOfTvPlayProgramInfo: "video/video_module/getOneOfTvPlayProgramInfo"
    })
  }
};
</script>

<style scoped lang="less">
.video-module-wrapper {
  width: 100%;
}
</style>
