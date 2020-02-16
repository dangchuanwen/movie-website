<template>
  <div class="hot-module-wrapper" v-if="hot_list && hot_list.length > 0">
    <div class="sub-title-wrapper">
      <sub-title :title="'正在热映'" :link_url="''"></sub-title>
    </div>
    <div class="hot-list-wrapper">
      <div class="list-wrapper flex">
        <hot-item
          class="f-fixed hot-item"
          v-for="item in hot_list"
          :key="item.name"
          :movie="item"
        ></hot-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BScroll from "better-scroll";
import SubTitle from "../../components/SubTitle";
import HotItem from "../../components/HotItem";
export default {
  name: "HotModule",
  components: {
    SubTitle,
    HotItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      hot_list: state => state.home.hot_module.hot_list
    })
  },
  mounted() {
    this.getHotList();
  },
  watch: {
    hot_list() {
      this.$nextTick(() => {
        this.bScroll = new BScroll(".hot-list-wrapper", {
          scrollX: true,
          preventDefault: false
        });
      });
    }
  },
  methods: {
    ...mapActions({
      getHotList: "home/hot_module/getHotList"
    })
  }
};
</script>

<style scoped lang="less">
.hot-module-wrapper {
  width: 375px;
  .sub-title-wrapper {
    margin: 0 auto;
    width: 355px;
  }
  .hot-list-wrapper {
    position: relative;
    margin-top: 5px;
    padding: 0 10px;
    width: 375px;
    height: 110px;
    .list-wrapper {
      position: absolute;
    }
    .hot-item {
      margin-left: 10px;
    }
  }
}
</style>
