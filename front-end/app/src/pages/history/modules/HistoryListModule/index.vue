<template>
  <div
    class="history-list-module-wrapper"
    v-if="watch_history_notes && watch_history_notes.length > 0"
  >
    <div
      class="one-day-history-wrapper flex f-d-c"
      v-for="note in watch_history_notes"
      :key="note.date"
    >
      <div class="date-wrapper flex f-ai-fe">
        <i class="iconfont icon-zhongbiao1"></i>
        <span class="date">{{ note.date }}</span>
      </div>
      <div class="history-list-wrapper">
        <history-item
          class="history-item"
          v-for="item of note.list"
          :key="item.name"
          :note="item"
        ></history-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import HistoryItem from "./components/HistoryItem";
export default {
  name: "HistoryListModule",
  components: {
    HistoryItem
  },
  mounted() {
    this.getWatchHistoryNotes();
  },
  computed: {
    ...mapState({
      watch_history_notes: state =>
        state.history.history_list_module.watch_history_notes
    })
  },
  methods: {
    ...mapActions({
      getWatchHistoryNotes: "history/history_list_module/getWatchHistoryNotes"
    })
  }
};
</script>

<style scoped lang="less">
.history-list-module-wrapper {
  width: 355px;

  .one-day-history-wrapper {
    width: 355px;

    .date-wrapper {
      width: 355px;
      height: 30px;
      .icon-zhongbiao1 {
        position: relative;
        left: 0;
        top: 3px;
        font-size: 20px;
        color: #ffed0d;
      }
      .date {
        margin-left: 12px;
        color: white;
        font-size: 14px;
      }
    }

    .history-list-wrapper {
      box-sizing: border-box;
      border-left: 1px solid #303756;
      padding: 15px 10px 0 20px;
      width: 346px;
      align-self: flex-end;
      .history-item {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
