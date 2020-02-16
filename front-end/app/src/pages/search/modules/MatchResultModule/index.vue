<template>
  <div class="match-result-module-wrapper">
    <match-result-list
      :list="match_result_list"
      @handleClickItem="handleClickItem"
    ></match-result-list>
  </div>
</template>

<script>
// vuex
import { mapState } from "vuex";
import MatchResultList from "./components/MatchResultList";
export default {
  name: "MatchResultModule",
  components: {
    MatchResultList
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      match_result_list: state =>
        state.search.match_result_module.match_result_list
    })
  },
  mounted() {},
  methods: {
    handleClickItem(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped lang="less">
.match-result-module-wrapper {
  width: 100%;
}
</style>
