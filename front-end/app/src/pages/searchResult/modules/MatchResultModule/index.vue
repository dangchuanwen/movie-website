<template>
  <div
    class="match-result-module-wrapper flex f-w-w"
    v-if="search_result && search_result.length > 0"
  >
    <match-item-component
      class="match-item-wrapper"
      v-for="item of search_result"
      :program="item"
      :key="`${item.id}${item.name}`"
    ></match-item-component>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MatchItemComponent from "./components/MatchItem";
export default {
  name: "MatchResultModule",
  components: {
    MatchItemComponent
  },
  computed: {
    ...mapState({
      search_result: state => state.search_result.search_result.search_result
    })
  },
  methods: {
    ...mapActions({
      getSearchResultList: "search_result/search_result/getSearchResultList"
    })
  },
  mounted() {
    const { key_word } = this.$route.query;
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
  height: 98vh;
  overflow-x: hidden;
  overflow-y: scroll;
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
</style>
