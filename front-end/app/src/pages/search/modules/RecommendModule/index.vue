<template>
  <div v-if="recommend_list && recommend_list.length > 0">
    <recommend
      :title="'大家都在搜'"
      :list="recommend_list"
      @handleClickItem="handleClickItem"
    ></recommend>
  </div>
</template>
<script>
// vuex
import { mapState, mapActions } from "vuex";

import Recommend from "../../common-components/DisplayList";
export default {
  name: "RecommendModule",
  components: {
    Recommend
  },
  data() {
    return {};
  },
  mounted() {
    this.getRecommendList();
  },
  computed: {
    ...mapState({
      recommend_list: state => state.search.recommend_module.recommend_list
    })
  },
  methods: {
    ...mapActions({
      getRecommendList: "search/recommend_module/getRecommendList"
    }),
    handleClickItem(val) {
      this.$router.push({ path: "searchResult", query: { key_word: val } });
    }
  }
};
</script>

<style scoped lang="less"></style>
