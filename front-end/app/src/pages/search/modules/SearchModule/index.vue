<template>
  <div class="search-module-wrapper">
    <search
      :auto_focus="true"
      @handleClickGoBack="handleClickGoBack"
      @handleInput="handleInput"
      @handleClickSearch="handleSearch"
      @handlePressEnter="handleSearch"
    ></search>
  </div>
</template>

<script>
// vuex
import types from "./store/mutations-type";
import { mapMutations, mapActions } from "vuex";

import local_storage from "../../localStorage";
import Search from "./components/Search";
export default {
  name: "SearchModule",
  components: {
    Search
  },
  data() {
    return {
      key_word: "",
      searchTimer: null
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      getSearchMatchResult: "search/match_result_module/getSearchMatchResult"
    }),
    ...mapMutations({
      setKeyWord: `search/search_module/${types.SET_KEY_WORD}`
    }),
    handleClickGoBack() {
      this.$router.go(-1);
    },
    handleSearch() {
      const key_word = this.key_word.trim();
      if (key_word) {
        local_storage.addSearchHistory(key_word);
        this.getSearchMatchResult(key_word);
      }
    },
    handleInput(val) {
      this.key_word = val;
      this.setKeyWord(val);
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.handleSearch();
      }, 500);
    }
  },
  beforeDestroy() {
    this.setKeyWord("");
  }
};
</script>

<style scoped lang="less">
.search-module-wrapper {
  width: 345px;
  height: 50px;
}
</style>
