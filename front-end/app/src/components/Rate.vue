<template>
  <div class="rate-wrapper flex f-ai-c">
    <i
      :style="{ color: color }"
      class="iconfont icon-pingfen"
      v-for="item of star_count"
      :key="item + '*'"
    ></i>
    <i
      :style="{ color: color }"
      class="iconfont icon-pingfen1"
      v-for="item of emptyStarCount"
      :key="item + '#'"
    ></i>
    <span class="score" :style="{ color: color }">{{ rate }}</span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: () => "#fcf417"
    },
    score: {
      type: Number,
      default: () => 5.5
    }
  },
  name: "RateComponent",
  data() {
    return {
      star_count: Math.round(this.score / 2) % 10,
      rate: this.score.toFixed(1)
    };
  },
  computed: {
    emptyStarCount() {
      return 5 - this.star_count;
    }
  }
};
</script>

<style scoped lang="less">
.rate-wrapper {
  width: 100%;
  height: 25px;
  .icon-pingfen,
  .icon-pingfen1 {
    margin-right: 3px;
    font-size: 11px;
  }
  .score {
    font-size: 11px;
  }
}
</style>
