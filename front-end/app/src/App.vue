<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      touchStart: {
        x: null,
        y: null
      },
      touchEnd: {
        x: null,
        y: null
      }
    };
  },
  mounted() {
    window.addEventListener(
      "touchstart",
      e => {
        const { pageX, pageY } = e.touches[0];
        this.touchStart.x = pageX;
        this.touchStart.y = pageY;
      },
      {
        passive: false
      }
    );
    window.addEventListener(
      "touchmove",
      e => {
        const { pageX, pageY } = e.touches[0];
        this.touchEnd.x = pageX;
        this.touchEnd.y = pageY;
        const { touchStart, touchEnd } = this;
        if (
          e.preventDefault &&
          Math.abs(touchStart.x - touchEnd.x) >
            Math.abs(touchStart.y - touchEnd.y)
        ) {
          e.preventDefault();
        }
      },
      {
        passive: false
      }
    );
  }
};
</script>

<style>
/** 覆盖 nutui InfiniteLoading bottom 的样式 */
.bottom-tips {
  background: #1d2031;
}

a {
  text-decoration: none;
}
</style>
