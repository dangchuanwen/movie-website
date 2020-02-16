<template>
  <div class="page-wrapper">
    <div class="fixed">
      <search-module></search-module>
      <program-type-module></program-type-module>
    </div>
    <div class="placeblock"></div>
    <div class="classfication">
      <classification-module></classification-module>
      <movie-wall-module></movie-wall-module>
    </div>
  </div>
</template>

<script>
import SearchModule from "./modules/SearchModule";
import ProgramTypeModule from "./modules/ProgramTypeModule";
import ClassificationModule from "./modules/ClassificationModule";
import MovieWallModule from "./modules/MovieWallModule";
export default {
  name: "classificationPage",
  components: {
    SearchModule,
    ProgramTypeModule,
    ClassificationModule,
    MovieWallModule
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.page-wrapper {
  width: 100vw;
  height: 100vh;
  background: #1d2031;
  .fixed {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
  }
  .placeblock {
    width: 100%;
    height: 110px;
  }
  .classfication {
    background: #1d2031;
  }
}
</style>
