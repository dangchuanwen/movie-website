<template>
  <div
    class="language-model-wrapper"
    v-if="
      program_info &&
        program_info.languages &&
        program_info.languages.length > 1
    "
  >
    <plot-list
      :title="'剧集'"
      :list="program_info.languages"
      :activeIndex="activeIndex"
      @handleClickPlotItem="handleClickPlotItem"
    ></plot-list>
  </div>
</template>

<script>
import request from "@/utils/request";
import { mapState } from "vuex";
import PlotList from "../../components/PlotList";
export default {
  name: "PlotModule",
  components: {
    PlotList
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  computed: {
    ...mapState({
      program_info: state => state.video.video_module.program_info
    })
  },
  watch: {
    program_info() {
      this.setActiveIndex();
    }
  },
  mounted() {},
  methods: {
    setActiveIndex() {
      const { language } = this.$route.query;
      const index = this.program_info.languages.findIndex(
        item => item === language
      );
      this.activeIndex = index !== -1 ? index : 0;
    },
    async handleClickPlotItem(index) {
      const language = this.program_info.languages[index];
      const { path } = this.$route;
      const { id } = this.$route.query;
      const data = await request({
        method: "get",
        url: "/api/updateProgramId",
        params: {
          id,
          language
        }
      });

      if (data && data.data && data.data.datas) {
        this.$router.replace({
          path: path,
          query: {
            id: data.data.datas.id,
            language
          }
        });
        window.location.reload();
      }
    }
  }
};
</script>

<style scoped lang="less">
.language-model-wrapper {
  width: 375px;
}
</style>
