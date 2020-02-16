<template>
  <div
    class="wrapper"
    v-if="program_types_list && program_types_list.length > 0"
  >
    <tab
      :tabList="program_types_list"
      :activeIndex="activeIndex"
      @handleClickTab="handleClickTab"
    ></tab>
  </div>
</template>

<script>
import types from "@/pages/classification/modules/MovieWallModule/store/mutations-type.js";
import { mapState, mapMutations, mapActions } from "vuex";
import Tab from "./components/Tab.vue";
export default {
  name: "ProgramTypeModule",
  components: {
    Tab
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  computed: {
    ...mapState({
      program_types_list: state =>
        state.classification.program_type_module.program_types_list
    })
  },
  async mounted() {
    window.addEventListener("popstate", this.handlePopState);
    await this.getProgramTypesList();
    // 根据路由参数设置 标签页 activeIndex
    this.setActiveIndex();
  },
  beforeDestroy() {
    window.removeEventListener("popstate", this.handlePopState);
  },
  watch: {
    $route() {
      this.setActiveIndex();
    }
  },
  methods: {
    handlePopState() {
      this.$router.replace("/");
    },
    setActiveIndex() {
      const { program_type } = this.$route.params;
      const { program_types_list } = this;
      const index = program_types_list.findIndex(
        item => item.name === program_type
      );
      if (index !== -1) {
        this.activeIndex = index;
        // 参数合理，修改 http 请求参数
        this.updateHttpParams({
          key: "program_type",
          value: program_type
        });
      } else {
        this.activeIndex = 0;
      }
    },
    ...mapMutations({
      updateHttpParams: `classification/movie_wall_module/${types.UPDATE_HTTP_PARAMS}`
    }),
    ...mapActions({
      getProgramTypesList:
        "classification/program_type_module/getProgramTypesList"
    }),
    handleClickTab(val) {
      this.$router.push({
        params: { program_type: val }
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  position: relative;
  top: -8px;
  box-sizing: border-box;
  margin: 0 10px;
  padding: 0 10px 10px 10px;

  width: 355px;
  height: 60px;

  border-radius: 4px;
  background: #1d2031;
}
</style>
