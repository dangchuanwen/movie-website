<template>
  <div class="hot-module-wrapper" v-if="hot_list && hot_list.length > 0">
    <div class="sub-title-wrapper">
      <sub-title :title="'观看历史'" :link_url="'/history'"></sub-title>
    </div>
    <div class="history-list-wrapper">
      <div class="list-wrapper flex">
        <hot-item
          class="f-fixed hot-item"
          v-for="item in hot_list"
          :key="`${item.name}${item.fragment_order}`"
          :movie="item"
        ></hot-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BScroll from "better-scroll";
import SubTitle from "../../components/SubTitle";
import HotItem from "../../components/HotItem";
export default {
  name: "WatchHistoryModule",
  components: {
    SubTitle,
    HotItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      hot_list: state => state.home.watch_history_module.watch_history_list
    })
  },
  mounted() {
    this.getWatchHistoryList();
  },
  watch: {
    hot_list() {
      this.$nextTick(() => {
        if (this.hot_list.length === 0) {
          return;
        }
        this.bScroll = new BScroll(".history-list-wrapper", {
          scrollX: true,
          preventDefault: false
        });
      });
    }
  },
  methods: {
    ...mapActions({
      getWatchHistoryList: "home/watch_history_module/getWatchHistoryList"
    })
  }
};
</script>

<style scoped lang="less">
.hot-module-wrapper {
  width: 375px;
  .sub-title-wrapper {
    margin: 0 auto;
    width: 355px;
  }
  .history-list-wrapper {
    position: relative;
    margin-top: 5px;
    padding: 0 10px;
    width: 375px;
    height: 110px;
    .list-wrapper {
      position: absolute;
    }
    .hot-item {
      margin-left: 10px;
    }
  }
}
</style>
