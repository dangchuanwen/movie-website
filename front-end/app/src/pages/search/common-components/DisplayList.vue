<template>
  <div class="history-wrapper">
    <div class="text-and-dustbin-wrapper flex f-ai-c f-jc-sb">
      <span class="text">{{ title }}</span>
      <i
        class="iconfont icon-lajixiang"
        @click="handleClickClear"
        v-if="clear"
      ></i>
    </div>
    <div class="notes-wrapper flex f-w-w">
      <span
        class="note-label"
        v-for="item in list"
        :key="item"
        @click="handleClickItem(item)"
        >{{ item }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayList",
  props: {
    clear: {
      type: Boolean,
      default: () => false
    },
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClickItem(history) {
      this.$emit("handleClickItem", history);
    },
    handleClickClear() {
      this.$emit("handleClickClear");
    }
  }
};
</script>

<style lang="less" scoped>
.history-wrapper {
  width: 100%;

  .text-and-dustbin-wrapper {
    width: 100%;
    height: 30px;
    .text {
      color: #888888;
      font-size: 13px;
    }
    .icon-lajixiang {
      color: #888888;
      font-size: 15px;
    }
  }

  .notes-wrapper {
    padding-bottom: 10px;
    width: 100%;
    .note-label {
      margin-top: 10px;
      margin-right: 10px;
      padding: 6px;
      border-radius: 4px;
      font-size: 12px;
      background: #202533;
      color: #888888;
    }
  }
}
</style>
