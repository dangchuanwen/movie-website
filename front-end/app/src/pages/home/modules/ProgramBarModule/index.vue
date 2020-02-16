<template>
  <div class="program-bar-wrapper flex">
    <program-bar-item
      v-for="item of bar_list"
      :key="item.bar_name"
      :bar="item"
    ></program-bar-item>
  </div>
</template>

<script>
import ProgramBarItem from "./components/ProgramBarItem";
export default {
  name: "ProgramBarModule",
  components: {
    ProgramBarItem
  },
  data() {
    return {
      bar_list: [
        {
          bar_name: "观影",
          icon_path: require("@/assets/image/movie.jpg"),
          link_url: "/classification/电影"
        },
        {
          bar_name: "追剧",
          icon_path: require("@/assets/image/tv_play.jpg"),
          link_url: "/classification/电视剧"
        },
        {
          bar_name: "综艺",
          icon_path: require("@/assets/image/variety.jpg"),
          link_url: "/classification/综艺"
        },
        {
          bar_name: "动漫",
          icon_path: require("@/assets/image/comic.jpg"),
          link_url: "/classification/动漫"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped lang="less">
.program-bar-wrapper {
  margin: 15px 12.5px 0 12.5px;
  width: 350px;
  height: 100px;
}
</style>
