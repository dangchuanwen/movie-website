<template>
  <div class="pagination-component flex">
    <span
      class="pagination-pointer"
      :class="index === active_index ? 'choose' : 'no-choose'"
      v-for="(item, index) of banner_count"
      :key="index"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    banner_count: {
      type: Number,
      default: () => 5
    },
    active_index: {
      type: Number,
      default: () => 0
    }
  },
  name: "PaginationComponent"
};
</script>

<style scoped lang="less">
.pagination-component {
  margin-top: 12px;
  padding: 0 10px;
  height: 20px;
  .choose {
    width: 10px;
    background: #fcf417;
  }
  .no-choose {
    width: 5px;
    background: #eef9eb;
  }
  .pagination-pointer {
    margin-right: 5px;
    height: 5px;
    border-radius: 6px;
    transition: 0.05s;
  }
}
</style>
