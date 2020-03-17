<template>
  <div class="match-result-module-wrapper">
    <nut-infiniteloading
      class="item-container flex f-w-w"
      v-if="search_result && search_result.length > 0"
      @loadmore="onInfinite"
      :is-show-mod="true"
      :has-more="true"
      :threshold="200"
    >
      <match-item-component
        class="match-item-wrapper f-fixed"
        v-for="item of search_result"
        :program="item"
        :key="`${item.id}${item.name}`"
      ></match-item-component>
    </nut-infiniteloading>
  </div>
</template>

<script>
import Vue from "vue";
import { InfiniteLoading } from "@nutui/nutui";
InfiniteLoading.install(Vue);
import types from "./store/mutation-types";
import { mapState, mapActions, mapMutations } from "vuex";
import MatchItemComponent from "./components/MatchItem";
export default {
  name: "MatchResultModule",
  components: {
    MatchItemComponent
  },
  data() {
    return {
      key_word: "",
      loadTimer: null
    };
  },
  beforeDestroy() {
    clearTimeout(this.loadTimer);
  },
  computed: {
    ...mapState({
      search_result: state => state.search_result.search_result.search_result
    })
  },
  methods: {
    onInfinite() {
      clearTimeout(this.loadTimer);
      this.loadTimer = setTimeout(() => {
        this.getMoreSearchResultList(this.key_word);
      }, 200);
    },
    ...mapMutations({
      clearDatas: `search_result/search_result/${types.SET_SEARCH_RESULT_LIST}`
    }),
    ...mapActions({
      getMoreSearchResultList:
        "search_result/search_result/getMoreSearchResultList",
      getSearchResultList: "search_result/search_result/getSearchResultList"
    })
  },
  mounted() {
    // 清空数据，last_id 为 0
    this.clearDatas([]);

    const { key_word } = this.$route.query;
    this.key_word = key_word;
    this.getSearchResultList(key_word);
  }
};
</script>

<style scoped lang="less">
.match-result-module-wrapper {
  box-sizing: border-box;
  margin: auto;
  padding: 1vh 0;
  width: 94vw;
  overflow: hidden;
  .item-container {
    width: 100%;
    .match-item-wrapper {
      margin-top: 15px;
    }
    .match-item-wrapper:nth-child(3n + 1) {
      margin-right: 2vw;
    }
    .match-item-wrapper:nth-child(3n + 2) {
      margin-right: 2vw;
    }
  }
}
</style>
