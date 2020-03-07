<template>
  <div class="plot-module" v-if="ifShow">
    <plot-list
      v-if="program_info.fragment_number"
      :latest_plot="program_info.fragment_number"
      :watching_plot="program_info.watching_plot"
      @handleClickPlotItem="handleClickPlotItem"
    ></plot-list>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PlotList from "./components/PlotList";
export default {
  name: "PlotModule",
  components: {
    PlotList
  },
  computed: {
    ifShow() {
      return this.program_info && this.program_info.fragment_number > 1;
    },
    ...mapState({
      program_info: state => state.video.video_module.program_info
    })
  },
  methods: {
    ...mapActions({
      getProgramInfo: "video/video_module/getProgramInfo",
      getOneOfTvPlayProgramInfo: "video/video_module/getOneOfTvPlayProgramInfo"
    }),
    handleClickPlotItem(plot) {
      this.getOneOfTvPlayProgramInfo({ ...this.program_info, plot });
    }
  }
};
</script>

<style scoped lang="less">
.plot-module {
  width: 375px;
}
</style>
