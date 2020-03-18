<template>
  <div class="video-container-wrapper" v-if="src">
    <video-player
      ref="videoPlayer"
      class="video-player vjs-custom-skin"
      :playsinline="true"
      :options="playerOptions"
      @waiting="handleWaiting"
      @playing="handlePlaying"
      @timeupdate="handlePlayerTimeupdate($event)"
    />
    <loading-component
      class="loading-wrapper"
      v-if="waiting"
    ></loading-component>
  </div>
</template>

<script>
import LoadingComponent from "./Loading";
export default {
  name: "VideoContainerComponent",
  components: {
    LoadingComponent
  },
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
  watch: {
    poster(new_val) {
      this.playerOptions.poster = new_val;
    },
    src(new_val) {
      this.playerOptions.sources[0].src = new_val;
    }
  },
  data() {
    return {
      continued: this.currentTime > 0,
      isGetCurrentTime: true,
      currentTime_timer: null,
      waiting: false,
      playerOptions: {
        //controls: false,
        // playbackRates: [2.0, 2.0, 2.0, 2.0], //播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: this.src // url地址
          }
        ],
        hls: true,
        poster: this.poster, // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试" // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    };
  },
  mounted() {
    if (this.src) {
      this.player = this.$refs.videoPlayer.player;
    }
  },
  beforeDestroy() {
    clearTimeout(this.currentTime_timer);
  },
  methods: {
    handlePlayerTimeupdate(player) {
      if (this.isGetCurrentTime) {
        this.isGetCurrentTime = false;
        this.currentTime_timer = setTimeout(() => {
          this.isGetCurrentTime = true;
        }, 3000);
        const { currentTime, duration } = player.cache_;
        this.$emit("playerTimeUpdate", { currentTime, duration });
      }
    },
    handlePlaying() {
      if (this.continued) {
        this.continued = false;
        this.player.currentTime(this.currentTime);
      }
      this.waiting = false;
    },
    handleWaiting() {
      this.waiting = true;
    }
  }
};
</script>

<style lang="less">
.video-container-wrapper {
  width: 100%;
  position: relative;
  .vjs-loading-spinner {
    display: none !important;
  }
  .loading-wrapper {
    position: absolute;
    left: 157.5px;
    top: 65px;
    z-index: 100;
    width: 60px;
    height: 60px;
  }
}
</style>
