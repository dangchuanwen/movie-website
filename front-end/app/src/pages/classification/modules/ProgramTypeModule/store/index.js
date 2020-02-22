import types from "./mutations-type.js";
import request from "@/utils/request";
const state = {
  program_types_list: []
};

const mutations = {
  [types.SET_PROGRAM_TYPES_LIST](state, new_list) {
    state.program_types_list = new_list;
    // 调用 classification 模块，更改其分类
    this.commit(
      "classification/classification_module/update_classification",
      state.program_types_list[0].classifications
    );
  },
  [types.UPDATE_CLASSIFICATION](state, val) {
    let { program_types_list } = state;
    let { classifications } = program_types_list.find(
      item => item.name === val
    );
    // 调用 classification 模块，更改其分类
    this.commit(
      "classification/classification_module/update_classification",
      classifications
    );
  }
};

const actions = {
  async getProgramTypesList({ commit }) {
    let data = await request({
      method: "get",
      url: "/api/programTypesList"
    });
    return new Promise(resolve => {
      if (data && data.data && data.data.datas) {
        commit(types.SET_PROGRAM_TYPES_LIST, data.data.datas);
        resolve();
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
