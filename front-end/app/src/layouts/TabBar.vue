<template>
  <div class="tab-bar-wrapper flex">
    <!-- <div class="background-block" :style="move_div_style"></div> -->
    <a
      class="tab-bar-item-wrapper f-fg-1 f-d-c flex f-ai-c f-jc-c"
      v-for="(item, index) in tab_bar_list"
      :key="item.icon"
      @click="handleClickTab(index)"
      :data-method="'replace'"
      :data-link="item.path"
    >
      <i
        :class="'iconfont ' + item.icon"
        :style="{
          color: active_index === index ? 'white' : '#888888'
        }"
      ></i>
      <span
        class="tab-bar-text"
        :style="{
          color: active_index === index ? 'white' : '#888888'
        }"
        >{{ item.text }}</span
      >
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      move_div_style: {
        width: 0,
        transform: "",
        background: "",
        transition: 0
      },
      old_active_index: 0,
      active_index: 0,
      tab_bar_list: []
    };
  },
  created() {
    this.tab_bar_list = this.getTabBarList();
    this.setActiveIndex();
    this.initMoveDivStyle();
  },
  computed: {},
  watch: {
    active_index() {
      //this.setMoveDivStyle();
    },
    $route() {
      this.setActiveIndex();
    }
  },
  methods: {
    setActiveIndex() {
      const name = this.$route.name;
      const index = this.tab_bar_list.findIndex(item => item.name === name);
      if (index !== -1) {
        this.active_index = index;
      }
    },
    getTabBarList() {
      let res = [];
      const { routes } = this.$router.options;
      for (let route of routes) {
        if (route.hasTab) {
          const children = route.children;
          children.forEach(child => {
            if (child.tabBar) {
              res.push({
                name: child.name,
                path: "/" + child.name,
                ...child.tabBar
              });
            }
          });
          break;
        }
      }
      return res;
    },
    setMoveDivStyle() {
      clearTimeout(this.timer);
      const { active_index, tab_bar_list, old_active_index } = this;
      const color = tab_bar_list[active_index].color;
      const more = 8; // 多移动 然后 回到最终位置
      let transform = "";
      let transition = "0.2s";
      if (active_index > old_active_index) {
        // 向右
        transform = `translate3d( ${100 * active_index + more}% , 0, 0)`;
      } else if (active_index < old_active_index) {
        // 向左
        transform = `translate3d( ${100 * active_index - more}% , 0, 0)`;
      }
      this.move_div_style.transform = transform;
      this.move_div_style.background = color;
      this.move_div_style.transition = transition;
      this.$nextTick(() => {
        this.timer = setTimeout(() => {
          this.move_div_style.transition = "0.3s";
          this.move_div_style.transform = `translate3d( ${100 *
            active_index}% , 0, 0)`;
        }, 200);
      });
    },
    initMoveDivStyle() {
      this.move_div_style.width = `${100 / this.tab_bar_list.length}%`;
      this.move_div_style.transition = `0.2s`;
      this.move_div_style.background = this.tab_bar_list[
        this.active_index
      ].color;
    },
    handleClickTab(index) {
      this.old_active_index = this.active_index;
      this.active_index = index;
    }
  }
};
</script>

<style scoped lang="less">
.tab-bar-wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 55px;
  background: #393a42;
  .background-block {
    z-index: 10;
    position: absolute;
    top: 0;
    height: 100%;
  }
  .tab-bar-item-wrapper {
    height: 100%;
    .iconfont {
      position: relative;
      z-index: 12;
      font-size: 24px;
      transition: 0.2s;
    }
    .tab-bar-text {
      font-size: 11px;
      transition: 0.2s;
    }
  }
}
</style>
