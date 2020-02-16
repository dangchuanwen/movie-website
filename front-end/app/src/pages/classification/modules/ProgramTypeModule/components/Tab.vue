<template>
  <div class="tab-wrapper">
    <div class="tab-item-wrapper flex">
      <div
        class="tab-item f-fixed flex f-jc-c f-ai-c"
        v-for="(item, index) in tab_list"
        v-width:addCounter="`tab_list[${index}].width`"
        :key="item.name"
        @click="handleClickTab(index)"
      >
        <span class="tab-item-name">{{ item.name }}</span>
      </div>
    </div>

    <div class="tab-line-wrapper">
      <div class="tab-line" :style="lineStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    activeIndex: {
      type: Number,
      default: () => 0
    },
    tabList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      count: 0, // 计算 一个tab 宽度 then + 1
      tab_list: this.tabList.map(item => {
        return { ...item };
      }),
      tab_line_width_ratio: 0.4,
      active_index: null
    };
  },
  watch: {
    activeIndex(new_val) {
      this.active_index = new_val;
    }
  },
  methods: {
    addCounter() {
      this.count++;
      if (this.count === this.tab_list.length) {
        // lineStyle depend on active_index
        this.active_index = this.activeIndex;
      }
    },
    handleClickTab(index) {
      this.$emit("handleClickTab", this.tab_list[index].name);
    }
  },
  computed: {
    lineStyle() {
      // depend on active_index and tab_list
      if (this.active_index === null || this.tab_list.length === 0) {
        return {};
      }
      const tab_line_width_ratio = this.tab_line_width_ratio;
      const tab_list = this.tab_list;
      const active_index = this.active_index;
      let left = 0,
        width = 0;
      for (let i = 0; i < active_index; i++) {
        left += tab_list[i].width;
      }
      width = tab_list[active_index].width * tab_line_width_ratio;
      left += Math.floor((tab_list[active_index].width - width) / 2);
      return {
        left: left + "px",
        width: width + "px"
      };
    }
  }
};
</script>

<style scoped>
.tab-wrapper {
  display: inline-block;
  vertical-align: top;

  height: 50px;

  border-radius: 4px;
}
.tab-item-wrapper {
  height: 46px;
}
.tab-item {
  position: relative;
  padding: 0 12px;
}
.tab-item-name {
  font-size: 16px;
  color: gray;
}
.tab-line-wrapper {
  width: 100%;
  height: 4px;
}
.tab-line {
  position: relative;
  width: 0px;
  height: 4px;
  transition: 0.3s;
  border-radius: 2px;
  background: #888888;
}
</style>
