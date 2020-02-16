<template>
  <div class="search-wrapper flex f-d-c">
    <search-module></search-module>
    <div v-if="!showMatchResult">
      <history-notes-module></history-notes-module>
      <recommend-module></recommend-module>
    </div>
    <match-result-module v-else></match-result-module>
  </div>
</template>

<script>
import { mapState } from "vuex";

import SearchModule from "./modules/SearchModule";
import HistoryNotesModule from "./modules/HisitoryNotesModule";
import RecommendModule from "./modules/RecommendModule";
import MatchResultModule from "./modules/MatchResultModule";
export default {
  name: "SearchPage",
  components: {
    SearchModule,
    HistoryNotesModule,
    RecommendModule,
    MatchResultModule
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      showMatchResult: state => Boolean(state.search.search_module.key_word)
    })
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.search-wrapper {
  padding: 0 15px;
  width: 345px;
  height: 100vh;
  background: #1d2031;
}
</style>
