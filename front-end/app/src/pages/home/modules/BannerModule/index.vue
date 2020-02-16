<template>
  <div class="banner-module-wrapper" v-if="list && list.length > 0">
    <banner-swiper-component
      :banner_list="list"
      @handleSlideEnd="handleSlideEnd"
    ></banner-swiper-component>
    <div class="pagination-wrapper">
      <pagination-component
        :banner_count="list.length"
        :active_index="active_index"
      ></pagination-component>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BannerSwiperComponent from "./components/BannerSwiper";
import PaginationComponent from "./components/Pagination";
export default {
  name: "BannerModule",
  components: {
    BannerSwiperComponent,
    PaginationComponent
  },
  data() {
    return {
      active_index: 0
    };
  },
  created() {
    this.getBannerList();
  },
  computed: {
    ...mapState({
      list: state => state.home.banner_module.banner_list
    })
  },
  methods: {
    ...mapActions({
      getBannerList: "home/banner_module/getBannerList"
    }),
    handleSlideEnd(active_index) {
      this.active_index = active_index;
    }
  }
};
</script>

<style scoped lang="less">
.banner-module-wrapper {
  position: relative;
  margin-top: 20px;
  width: 375px;
  height: 150px;
  .pagination-wrapper {
    position: absolute;
    right: 17.5px;
    bottom: 0;
    height: 25px;
  }
}
</style>
