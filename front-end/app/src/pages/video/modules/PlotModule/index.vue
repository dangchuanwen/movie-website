<template>
  <div class="plot-module">
    <plot-list
      v-if="program_info.latest_plot"
      :latest_plot="program_info.latest_plot"
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
    ...mapState({
      program_info: state => state.video.video_module.program_info
    })
  },
  methods: {
    ...mapActions({
      getProgramInfo: "video/video_module/getProgramInfo"
    }),
    handleClickPlotItem(plot) {
      this.getProgramInfo({ ...this.program_info, plot });
    }
  }
};
</script>

<style scoped lang="less">
.plot-module {
  width: 375px;
}
</style>
