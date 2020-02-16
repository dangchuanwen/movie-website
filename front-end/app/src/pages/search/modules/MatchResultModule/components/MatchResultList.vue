<template>
  <div class="match-result-list-wrapper">
    <div
      class="match-result-item-wrapper flex f-ai-c"
      v-for="(item, index) in list"
      :key="index"
      @click="handleClickItem(item)"
    >
      <span class="match-result">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  name: "MatchResultListComponent",
  methods: {
    handleClickItem(item) {
      this.$emit("handleClickItem", item);
    }
  }
};
</script>

<style lang="less" scoped>
.match-result-item-wrapper {
  border-bottom: 1px solid #202533;
  width: 100%;
  height: 35px;

  .match-result {
    font-size: 12px;
    color: #888888;
  }
}
</style>
