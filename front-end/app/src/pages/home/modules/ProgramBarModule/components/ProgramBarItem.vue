<template>
  <a
    class="program-bar-item-wrapper f-fg-1 flex f-d-c f-ai-c f-jc-c"
    v-if="bar.bar_name"
    :data-link="bar.link_url"
  >
    <img :src="bar.icon_path" alt="" class="bar-image" />
    <span class="bar-name">{{ bar.bar_name }}</span>
  </a>
</template>

<script>
export default {
  name: "ProgramBarItemComponent",
  props: {
    bar: {
      type: Object,
      default: () => {}
    }
  },
  methods: {}
};
</script>

<style scoped lang="less">
.program-bar-item-wrapper {
  height: 100%;
  .bar-image {
    width: 45px;
  }
  .bar-name {
    margin-top: 10px;
    color: #888888;
    font-size: 11px;
  }
}
</style>
