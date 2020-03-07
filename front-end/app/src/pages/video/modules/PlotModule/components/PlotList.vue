<template>
  <div class="plot-list-component-wrapper flex f-d-c">
    <div class="title-wrapper flex f-jc-sb">
      <span class="title">剧情</span>
      <span class="latest-plot"
        >更新至{{ latest_plot }}集<i class="iconfont icon-ziyuan"></i
      ></span>
    </div>
    <div class="plot-list-wrapper f-fg-1 flex" ref="plotListWrapper">
      <div
        class="plot-items-container flex f-w-w"
        v-childHeight="'plotItemHeight'"
      >
        <div
          class="plot-item flex f-ai-c f-jc-c f-fixed"
          v-for="(item, index) of latest_plot"
          v-height="'plotItemHeight'"
          :key="item"
          :class="index === active_index ? 'choose' : ''"
          @click="handleClickPlotItem(index)"
        >
          {{ index + 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlotListComponent",
  props: {
    latest_plot: {
      type: Number,
      required: true
    },
    watching_plot: {
      type: Number,
      default: () => 1
    }
  },
  data() {
    return {
      plotItemHeight: 0,
      active_index: this.watching_plot - 1
    };
  },
  mounted() {
    let plotItemHeight = Math.ceil((this.plotItemHeight * 9) / 7);
    let scrollHeight = (Math.ceil(this.watching_plot / 5) - 4) * plotItemHeight;
    this.$refs.plotListWrapper.scrollTo(0, scrollHeight);
  },
  methods: {
    handleClickPlotItem(index) {
      this.active_index = index;
      this.$emit("handleClickPlotItem", index + 1);
    }
  }
};
</script>

<style scoped lang="less">
.plot-list-component-wrapper {
  box-sizing: border-box;
  border-top: 5px solid #2a314d;
  border-bottom: 5px solid #2a314d;
  padding: 25px 10px 35px 10px;
  width: 375px;

  .title-wrapper {
    width: 100%;
    height: 30px;
    .title {
      color: #888888;
      font-size: 16px;
    }
    .latest-plot {
      color: #888888;
      font-size: 14px;
      .icon-ziyuan {
        margin-left: 8px;
      }
    }
  }

  .plot-list-wrapper {
    position: relative;
    width: 100%;
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    .plot-items-container {
      position: absolute;
      .plot-item {
        margin-top: 10px;
        margin-right: 11px;
        width: 60px;
        height: 35px;
        border-radius: 5px;
        color: #888888;
        font-size: 18px;
        background: #2a314d;
        transition: 0.3s;
      }
      .choose {
        color: white;
        background: #31c1fe;
      }
    }
  }
}
</style>
