<template>
  <a
    class="recommend-item-wrapper flex f-d-c"
    v-if="movie.name"
    :data-link="movie.link_url"
  >
    <div
      class="poster-wrapper"
      :style="{ boxShadow: `0 13px 35px -15px ${movie.poster_main_color}` }"
    >
      <img
        class="today-hot-icon"
        v-if="movie.is_most_hot"
        :src="today_hot_icon"
        alt=""
      />
      <img :src="movie.poster_url" alt="" class="poster" />
    </div>

    <div class="name-wrapper flex f-ai-c f-jc-sb">
      <span class="name">{{ movie.name }}</span>
      <i class="iconfont icon-hot" v-if="movie.is_very_hot"></i>
    </div>

    <span class="director">{{ movie.director_name }}</span>
  </a>
</template>

<script>
export default {
  name: "RecommendItemComponent",
  props: {
    movie: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      today_hot_icon: require("@/assets/image/today-hot.png")
    };
  }
};
</script>

<style scoped lang="less">
.recommend-item-wrapper {
  width: 130px;
  overflow: hidden;
  border-radius: 3px;

  .poster-wrapper {
    position: relative;
    width: 100%;
    height: 160px;
    overflow: hidden;
    .today-hot-icon {
      position: absolute;
      top: 0;
      left: 2px;
      width: 35px;
    }
    .poster {
      width: 100%;
    }
  }

  .name-wrapper {
    margin-top: 8px;
    width: 100%;
    height: 20px;
    .name {
      max-width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: white;
      font-size: 13px;
    }
    .icon-hot {
      color: #ffff00;
      font-size: 13px;
    }
  }

  .director {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: gray;
    font-size: 11px;
  }
}
</style>
