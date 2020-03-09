<template>
  <div
    class="history-module-wrapper"
    v-if="history_list && history_list.length > 0"
  >
    <history
      :clear="true"
      :title="'历史搜索'"
      :list="history_list"
      @handleClickClear="handleClickClear"
      @handleClickItem="handleClickItem"
    ></history>
  </div>
</template>

<script>
import local_storage from "../../localStorage";
import History from "../../common-components/DisplayList";
export default {
  name: "HistoryNotesModule",
  components: {
    History
  },
  data() {
    return {
      history_list: local_storage.getSearchHistoryList()
    };
  },
  methods: {
    handleClickItem(history) {
      this.$router.push({ path: "searchResult", query: { key_word: history } });
    },
    handleClickClear() {
      local_storage.setSearchHistoryList([]);
      this.history_list = [];
    }
  }
};
</script>

<style scoped lang="less">
.history-module-wrapper {
  width: 345px;
}
</style>
