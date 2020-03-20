<template>
  <a
    class="hot-item-wrapper flex"
    v-if="movie.name"
    :data-link="movie.link_url"
  >
    <div class="poster-wrapper f-fixed">
      <img class="poster_url" :src="movie.poster_url" alt="" />
    </div>
    <div class="info-wrapper f-fg-1 flex f-d-c">
      <span class="name no-wrap">{{ movie.name }}</span>
      <span class="classification">{{ movie.program_classification }}</span>
      <span class="director no-wrap">导演：{{ movie.director_name }}</span>
      <rate-component
        class="rate"
        :score="movie.program_score"
      ></rate-component>
    </div>
  </a>
</template>

<script>
import RateComponent from "@/components/Rate.vue";
export default {
  name: "HotItemComponent",
  props: {
    movie: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    RateComponent
  }
};
</script>

<style scoped lang="less">
.hot-item-wrapper {
  box-sizing: border-box;
  padding: 7px;
  width: 220px;
  height: 110px;
  background: #2a314d;
  border-radius: 5px;
  overflow: hidden;
  .poster-wrapper {
    width: 70px;
    height: 96px;
    border-radius: 3px;
    overflow: hidden;
    .poster_url {
      width: 100%;
    }
  }
  .info-wrapper {
    width: 126px;
    margin-left: 10px;
    height: 100%;
    .name {
      margin-top: 8px;
      color: white;
      font-size: 14px;
    }
    .classification {
      margin-top: 10px;
      font-size: 10px;
      color: #888888;
    }
    .director {
      margin-top: 4px;
      font-size: 10px;
      color: #595c6f;
    }
    .rate {
      margin-top: 1px;
    }
  }
}
</style>
