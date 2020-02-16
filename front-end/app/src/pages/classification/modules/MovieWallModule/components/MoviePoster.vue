<template>
  <div class="movie-poster-wrapper" v-if="movie.name">
    <a class="link-tag" :href="movie.movie_url">
      <div class="movie-poster">
        <img class="movie-img" :src="movie.movie_img_url" alt="" />
      </div>
      <div class="movie-name flex f-ai-c">{{ movie.name }}</div>
      <rate-component :score="movie.score" :color="'#FFFF73'"></rate-component>
    </a>
  </div>
</template>

<script>
import RateComponent from "@/components/Rate.vue";
export default {
  name: "MoviePoster",
  components: {
    RateComponent
  },
  props: {
    movie: {
      type: Object,
      default: () => {
        return {
          name: "",
          movie_img_url: "",
          movie_url: ""
        };
      }
    }
  }
};
</script>

<style scoped>
.movie-poster-wrapper {
  box-sizing: border-box;
  padding: 0 5px;
  width: 120px;
}
.movie-poster {
  width: 107px;
  height: 147px;
}
.movie-name {
  width: 107px;
  height: 30px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 15px;
  color: #888888;
}
.link-tag {
  text-decoration: none;
}
.movie-img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-shadow: 2px 4px 15px rgba(51, 51, 51, 0.2);
}
</style>
