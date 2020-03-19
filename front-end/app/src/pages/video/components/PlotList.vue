<template>
  <div
    class="plot-list-component-wrapper flex f-d-c"
    v-if="list && list.length > 0"
  >
    <div class="title-wrapper flex f-jc-sb">
      <span class="title">{{ title }}</span>
      <span class="latest-plot"
        >{{ subTitle }}<i class="iconfont icon-ziyuan"></i
      ></span>
    </div>
    <div class="plot-list-wrapper f-fg-1 flex" ref="plotListWrapper">
      <div
        class="plot-items-container flex f-w-w"
        v-childHeight="'plotItemHeight'"
      >
        <div
          class="plot-item flex f-ai-c f-jc-c f-fixed"
          v-for="(item, index) of list"
          v-height="'plotItemHeight'"
          :key="item"
          :class="index === active_index ? 'choose' : ''"
          @click="handleClickPlotItem(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlotListComponent",
  props: {
    subTitle: {
      type: String,
      default: () => ""
    },
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: () => 0
    }
  },
  watch: {
    activeIndex(new_val) {
      this.active_index = new_val;
    }
  },
  data() {
    return {
      plotItemHeight: 0,
      active_index: this.activeIndex
    };
  },
  mounted() {
    let plotItemHeight = Math.ceil((this.plotItemHeight * 9) / 7);
    let scrollHeight =
      (Math.ceil((this.active_index + 1) / 5) - 4) * plotItemHeight;
    this.$refs.plotListWrapper.scrollTo(0, scrollHeight);
  },
  methods: {
    handleClickPlotItem(index) {
      this.$emit("handleClickPlotItem", index);
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
