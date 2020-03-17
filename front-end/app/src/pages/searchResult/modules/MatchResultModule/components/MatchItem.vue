<template>
  <a class="match-item-wrapper" v-if="program" :data-link="program.link_url">
    <div class="poster-wrapper">
      <img :src="program.poster_url" alt="" />
    </div>
    <div class="name-wrapper flex">
      <span class="name">{{ program.name }}</span>
    </div>
  </a>
</template>

<script>
export default {
  name: "MatchItemComponent",
  props: {
    program: {
      type: Object,
      default: () => null
    }
  }
};
</script>

<style scoped lang="less">
.match-item-wrapper {
  width: 30vw;
  height: 160px;
  overflow: hidden;
  .poster-wrapper {
    width: 100%;
    height: 135px;
    overflow: hidden;
    border-radius: 4px;
    img {
      width: 100%;
    }
  }

  .name-wrapper {
    margin-top: 5px;
    width: 100%;
    height: 20px;
    .name {
      font-size: 14px;
      color: #555;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
