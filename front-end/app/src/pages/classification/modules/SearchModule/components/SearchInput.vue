<template>
  <div class="search-input-wrapper flex f-ai-c" @click="handleInput">
    <slot name="icon"></slot>
    <input class="input" :placeholder="placeholder" disabled />
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    handleInput() {
      this.$emit("handleInput");
    }
  }
};
</script>

<style scoped>
.search-input-wrapper {
  padding: 0 10px;

  width: 190px;
  height: 32px;

  box-sizing: border-box;
  border-radius: 20px;
}
.icon-xingqiu {
  font-size: 24px;
  color: gray;
}
.input {
  outline: none;
  border: none;

  box-sizing: border-box;
  padding-left: 5px;
  width: 130px;
  height: 26px;

  background: transparent;
  color: #333;
  font-size: 12px;
}
.input::placeholder {
  color: #888888;
}
.icon-wrapper {
  width: 20px;
  height: 20px;
}
</style>
