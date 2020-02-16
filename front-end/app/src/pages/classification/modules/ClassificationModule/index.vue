<template>
  <div
    class="classfication-module-wrapper"
    v-if="classfication_datas && classfication_datas.length > 0"
  >
    <classfication-swiper
      v-for="item in classfication_datas"
      :key="item.key"
      :key_name="item.key"
      :classfication_list="item.datas"
      @handleClickClassfication="handleClickClassfication"
    ></classfication-swiper>
  </div>
</template>

<script>
import types from "@/pages/classification/modules/MovieWallModule/store/mutations-type.js";
import { mapState, mapMutations, mapActions } from "vuex";
import ClassficationSwiper from "./components/ClassficationSwiper.vue";
export default {
  name: "ClassficationModule",
  components: {
    ClassficationSwiper
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      classfication_datas: state =>
        state.classification.classification_module.classification_datas
    })
  },
  mounted() {
    this.getClassificationDatas();
  },
  methods: {
    ...mapMutations({
      updateHttpParams: `classification/movie_wall_module/${types.UPDATE_HTTP_PARAMS}`
    }),
    ...mapActions({
      getClassificationDatas:
        "classification/classification_module/getClassificationDatas"
    }),
    handleClickClassfication(key, value) {
      this.updateHttpParams({ key, value });
    }
  }
};
</script>

<style scoped>
.classfication-module-wrapper {
  margin: 0 10px;

  box-sizing: border-box;
  width: 355px;

  background: #1d2031;
}
</style>
