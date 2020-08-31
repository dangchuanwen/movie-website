import VueRouter from "vue-router";
import Vue from "vue";

// 页面组件

Vue.use(VueRouter);

const routes = [
  {
    hasTab: true,
    path: "/",
    component: () => import("@/layouts/LayOut"),
    children: [
      {
        name: "home", // tabBar 如果是 tabBar 必须加上
        path: "/home",
        component: () => import("@/pages/home"),
        alias: "/",
        tabBar: {
          icon: "icon-home", // 阿里 iconfont class="iconfont ${icon}"
          color: "#7CBBF4",
          text: "首页"
        }
      },
      {
        path: "/classification",
        redirect: "/classification/电影"
      },
      {
        name: "classification",
        path: "/classification/:program_type",
        component: () => import("@/pages/classification"),
        tabBar: {
          icon: "icon-classify-on",
          color: "#FFAD66",
          text: "分类"
        }
      }
    ]
  },
  {
    path: "/search",
    component: () => import("@/pages/search")
  },
  {
    path: "/history",
    component: () => import("@/pages/history")
  },
  {
    path: "/video",
    component: () => import("@/pages/video")
  },
  {
    path: "/searchResult",
    component: () => import("@/pages/searchResult")
  }
];

const router = new VueRouter({
  routes
});

export default router;
