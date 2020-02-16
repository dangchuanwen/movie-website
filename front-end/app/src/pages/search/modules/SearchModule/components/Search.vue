<template>
  <div class="search-wrapper flex f-ai-c f-jc-sb">
    <i class="iconfont icon-zuo" @click="handleClickGoBack"></i>
    <div class="input-wrapper flex f-ai-c f-jc-sb">
      <input
        ref="input"
        type="text"
        class="input f-fg-1"
        v-model="key_word"
        v-on:keyup.enter="handlePressEnter"
        placeholder="搜你所想"
      />
      <nut-icon
        v-if="key_word"
        @click.native="handleClickClear"
        type="circle-cross"
        color="#888888"
        size="16px"
      ></nut-icon>
    </div>
    <span class="search-text" @click="handleClickSearch">搜索</span>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "@nutui/nutui";
Icon.install(Vue);
export default {
  name: "SearchComponent",
  props: {
    auto_focus: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      key_word: ""
    };
  },
  mounted() {
    if (this.auto_focus) {
      this.$refs.input.focus();
    }
  },
  methods: {
    handlePressEnter() {
      this.$emit("handlePressEnter");
    },
    handleClickSearch() {
      this.$emit("handleClickSearch");
    },
    handleClickGoBack() {
      this.$emit("handleClickGoBack");
    },
    handleClickClear() {
      this.key_word = "";
    }
  },
  watch: {
    key_word(new_val) {
      this.$emit("handleInput", new_val);
    }
  }
};
</script>

<style scoped lang="less">
.search-wrapper {
  width: 100%;
  height: 100%;
  .icon-zuo {
    font-size: 22px;
    color: #888888;
  }
  .input-wrapper {
    box-sizing: border-box;
    padding-right: 10px;
    width: 270px;
    height: 35px;
    border-radius: 3px;
    background: #202533;
    .input {
      outline: none;
      border: none;
      margin-left: 10px;
      height: 35px;
      background: transparent;
      color: #888888;
      &::placeholder {
        color: #888888;
      }
    }
  }
  .search-text {
    color: #888888;
    font-size: 16px;
  }
}
</style>
