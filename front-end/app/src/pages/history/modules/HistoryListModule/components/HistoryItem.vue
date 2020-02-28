<template>
  <a class="history-item-wrapper flex" v-if="note" :data-link="note.link_url">
    <div class="poster-wrapper">
      <img class="poster" :src="note.poster_url" alt="" />
    </div>
    <div class="info-wrapper flex f-d-c">
      <span class="name">{{ note.name }}</span>
      <span class="classification">{{ note.program_classification }}</span>
      <span class="progress-text"
        >已观看{{ note.progress | filterProgress }}%</span
      >
      <span
        class="progress-bar"
        :style="{ width: `${note.progress * 100}%` }"
      ></span>
    </div>
  </a>
</template>

<script>
export default {
  name: "HistoryItemComponent",
  props: {
    note: {
      type: Object,
      default: () => null
    }
  },
  filters: {
    filterProgress(progress) {
      return progress * 100;
    }
  }
};
</script>

<style scoped lang="less">
.history-item-wrapper {
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  height: 120px;
  border-radius: 8px;
  background: #272d45;
  .poster-wrapper {
    width: 25%;
    height: 100%;
    overflow: hidden;
    border-radius: 5px;
    .poster {
      width: 100%;
    }
  }
  .info-wrapper {
    margin-left: 3%;
    width: 72%;
    height: 100%;
    .name {
      margin-top: 5px;
      color: white;
      font-size: 16px;
    }
    .classification {
      margin-top: 7px;
      color: #888888;
      font-size: 14px;
    }
    .progress-text {
      margin-top: 7px;
      color: whitesmoke;
      font-size: 12px;
    }
    .progress-bar {
      margin-top: 7px;
      height: 3px;
      border-radius: 3px;
      background: #f5f605;
    }
  }
}
</style>
