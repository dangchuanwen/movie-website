import types from "./mutations-type";
import request from "@/utils/request";

const state = {
  watch_history_notes: []
};

const mutations = {
  [types.SET_WATCH_HISTORY_NOTES](state, new_notes) {
    state.watch_history_notes = new_notes;
  }
};

const actions = {
  async getWatchHistoryNotes({ commit }) {
    let data = await request({
      method: "get",
      url: "/api/watchHistoryNotes"
    });
    if (data && data.data && data.data.datas) {
      commit(types.SET_WATCH_HISTORY_NOTES, data.data.datas);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
