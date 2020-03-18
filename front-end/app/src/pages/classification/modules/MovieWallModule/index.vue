<template>
  <div>
    <div v-if="movie_wall_datas && movie_wall_datas.length > 0">
      <nut-infiniteloading
        @loadmore="onInfinite"
        :is-show-mod="true"
        :has-more="true"
        :is-loading="false"
        :threshold="200"
      >
        <div class="movie-wall-wrappr flex f-w-w">
          <movie-poster
            v-for="item in movie_wall_datas"
            :key="item.id"
            :movie="item"
          ></movie-poster>
        </div>
      </nut-infiniteloading>
    </div>
    <div class="no-datas-tip flex f-jc-c f-ai-c" v-if="!requested">
      <span class="iconfont icon-jiazai1"></span>
      <span class="loading-text">加载中...</span>
    </div>
    <div
      class="no-datas-tip flex f-jc-c f-ai-c"
      v-if="requested && movie_wall_datas.length === 0"
    >
      <span class="loading-text">空空如也</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import types from "./store/mutations-type";
import Vue from "vue";
import { InfiniteLoading } from "@nutui/nutui";
InfiniteLoading.install(Vue);
import MoviePoster from "./components/MoviePoster.vue";
export default {
  name: "MovieWallModule",
  components: {
    MoviePoster
  },
  data() {
    return {
      requested: false,
      isHasMore: true,
      isLoading: false,
      isErr: false,
      timer: null
    };
  },
  computed: {
    ...mapState({
      http_params_changed: state =>
        state.classification.movie_wall_module.http_params_changed,
      movie_wall_datas: state =>
        state.classification.movie_wall_module.movie_wall_datas
    })
  },
  watch: {
    http_params_changed() {},
    movie_wall_datas() {
      this.requested = true;
    }
  },
  mounted() {},
  methods: {
    ...mapMutations({
      updateHttpParams: `classification/movie_wall_module/${types.UPDATE_HTTP_PARAMS}`
    }),
    ...mapActions({
      initMovieWallDatas: "classification/movie_wall_module/initMovieWallDatas",
      loadMoreMovieWallDatas:
        "classification/movie_wall_module/loadMoreMovieWallDatas"
    }),
    onInfinite() {
      this.isLoading = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.loadMoreMovieWallDatas().then(
          isHasMore => {
            this.isLoading = false;
            this.isHasMore = isHasMore;
          },
          () => {
            this.isLoading = false;
            this.isHasMore = false;
          }
        );
      }, 100);
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
.movie-wall-wrappr {
  margin: 10px 0px 0 7.5px;
  padding: 5px 0;
  width: 360px;
}
.no-datas-tip {
  margin-top: 10px;
  padding-bottom: 260px;
  width: 100%;
  height: 80px;
  background: #1d2031;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.icon-jiazai1 {
  font-size: 20px;
  color: gray;
  animation: loading 0.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.loading-text {
  margin-left: 5px;
  font-size: 14px;
  color: #888888;
}
</style>
