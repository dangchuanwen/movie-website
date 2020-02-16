<template>
  <div class="loading-wrapper flex f-ai-c f-d-c f-jc-c">
    <i class="iconfont icon-jiazai1"></i>
    <span class="text">加载中</span>
  </div>
</template>

<script>
export default {
  name: "LoadingComponent"
};
</script>

<style scoped lang="less">
.loading-wrapper {
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .icon-jiazai1 {
    color: white;
    font-size: 30px;
    animation-name: loading;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
  .text {
    color: white;
    font-size: 13px;
  }
}
</style>
