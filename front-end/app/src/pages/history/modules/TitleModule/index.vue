<template>
  <div class="title-wrapper flex f-ai-c f-jc-c">
    <i class="iconfont icon-zuo" @click="$router.go(-1)"></i>
    <span class="title">观看历史</span>
  </div>
</template>

<script>
export default {
  name: "TitleModule"
};
</script>

<style scoped lang="less">
.title-wrapper {
  position: relative;
  width: 100%;
  height: 60px;
  .title {
    color: white;
    font-size: 22px;
  }
  .icon-zuo {
    position: absolute;
    left: 0;
    font-size: 23px;
    color: white;
  }
}
</style>
