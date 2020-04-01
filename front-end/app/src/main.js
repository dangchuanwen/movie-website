import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";

import "@/assets/flex.css";
import "@/assets/iconfont/iconfont.css";
import "@/assets/reset.css";
import router from "@/router/index.js";
import store from "@/store/index.js";

import { domWidth } from "@/directives";
import { listenClickATag } from "@/utils/util";

Vue.use(domWidth);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.prototype.bus = new Vue();

listenClickATag(document.body, router);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
