<template>
  <div class="video-container-wrapper" v-if="src">
    <div id="video-wrapper"></div>
  </div>
</template>

<script>
import Chimee from "chimee";
import chimeePluginCenterState from "chimee-plugin-center-state";
import hls from "chimee-kernel-hls";
Chimee.install(chimeePluginCenterState);

export default {
  name: "VideoContainerComponent",
  components: {},
  props: {
    currentTime: {
      type: Number,
      default: () => 0
    },
    src: {
      type: String,
      default: () => ""
    },
    poster: {
      type: String,
      default: () => ""
    }
  },
  watch: {},
  data() {
    return {
      currentTime_timer: null
    };
  },
  mounted() {
    const width = document.body.offsetWidth;
    const height = (width * 211) / 375;
    this.player = new Chimee({
      wrapper: "#video-wrapper",
      src: this.src,
      controls: true,
      autoplay: false,
      poster: this.poster,
      width: width,
      height: height,
      kernels: {
        hls
      },
      plugin: [chimeePluginCenterState.name]
    });
    this.player.currentTime = this.currentTime;
    this.player.on("play", () => {
      this.getVideoCurrentTime();
    });
  },
  beforeDestroy() {
    this.player = null;
    clearTimeout(this.currentTime_timer);
  },
  methods: {
    getVideoCurrentTime() {
      clearTimeout(this.currentTime_timer);
      this.currentTime_timer = setTimeout(() => {
        const { currentTime, duration } = this.player;
        if (typeof currentTime === "number" && typeof duration === "number") {
          this.$emit("playerTimeUpdate", { currentTime, duration });
        }
        this.getVideoCurrentTime();
      }, 5000);
    }
  }
};
</script>

<style lang="less">
.video-container-wrapper {
  width: 100%;
  position: relative;
  #video-wrapper {
    overflow: hidden;
  }
}
</style>
