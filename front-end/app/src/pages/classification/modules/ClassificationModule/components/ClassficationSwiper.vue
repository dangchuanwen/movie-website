<template>
  <div
    class="classfication-swiper-wrapper"
    v-if="listData && listData.length > 0"
  >
    <nut-scroller>
      <div
        class="classfication-wrapper flex f-ai-c"
        slot="list"
        v-for="(item, index) of listData"
        :key="item.name"
      >
        <span
          class="classfication-name"
          :class="active_index === index ? 'choose' : ''"
          @click="handleClickClassfication(index)"
          >{{ item.name }}</span
        >
      </div>
    </nut-scroller>
  </div>
</template>

<script>
import Vue from "vue";
import { Scroller } from "@nutui/nutui";
Scroller.install(Vue);
export default {
  name: "ClassficationSwiper",
  props: {
    key_name: {
      type: String,
      required: true
    },
    classfication_list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      active_index: 0,
      listData: JSON.parse(JSON.stringify(this.classfication_list))
    };
  },
  methods: {
    handleClickClassfication(index) {
      this.active_index = index;
      this.$emit(
        "handleClickClassfication",
        this.key_name,
        this.listData[index].name
      );
    }
  }
};
</script>

<style scoped lang="less">
.classfication-swiper-wrapper {
  width: 100%;
  height: 40px;

  background: #1d2031;
  .classfication-wrapper {
    padding: 0 10px;
    height: 40px;

    white-space: nowrap;
    .choose {
      background: #202533;
    }
    .classfication-name {
      padding: 5px 7px;
      position: relative;
      border-radius: 3px;
      font-size: 13px;
      color: #888888;
      transition: 0.2s;
    }
  }
}
</style>
