import Vue from "vue";
import Vuex from "vuex";

// 页面 store
import search from "@/pages/search/store";
import classification from "@/pages/classification/store";
import home from "@/pages/home/store";
import history from "@/pages/history/store";
import video from "@/pages/video/store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    search,
    classification,
    home,
    history,
    video
  }
});
