<template>
  <div
    class="recommend-module-wrapper"
    v-if="hot_recommend_list && hot_recommend_list.length > 0"
  >
    <sub-title :link_url="''" :title="'热门推荐'" class="sub-title"></sub-title>
    <div class="recommend-list-wrapper">
      <div class="list-wrapper flex">
        <recommend-item
          v-for="item in hot_recommend_list"
          :key="item.name"
          class="f-fixed recommend-item"
          :movie="item"
        ></recommend-item>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState, mapActions } from "vuex";
import SubTitle from "../../components/SubTitle";
import RecommendItem from "./components/RecommendItem";
export default {
  name: "RecommendModule",
  components: {
    SubTitle,
    RecommendItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      hot_recommend_list: state =>
        state.home.hot_recommend_module.hot_recommend_list
    })
  },
  mounted() {
    this.getHotRecommendList();
  },
  watch: {
    hot_recommend_list() {
      this.$nextTick(() => {
        this.bScroll = new BScroll(".recommend-list-wrapper", {
          scrollX: true,
          preventDefault: false
        });
      });
    }
  },
  methods: {
    ...mapActions({
      getHotRecommendList: "home/hot_recommend_module/getHotRecommendList"
    })
  }
};
</script>

<style scoped lang="less">
.recommend-module-wrapper {
  width: 375px;
  .sub-title {
    margin: 15px 10px 0 10px;
  }
  .recommend-list-wrapper {
    position: relative;
    margin-top: 5px;
    width: 375px;
    height: 217px;
    .list-wrapper {
      position: absolute;
      .recommend-item {
        margin-left: 10px;
        border-radius: 4px;
      }
    }
  }
}
</style>
