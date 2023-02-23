import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/watch",
      name: "watch",
      component: () => import("../views/Watch.vue"),
    },
    {
      path: "/content-editor",
      name: "content-editor",
      component: () => import("../views/ContentEditor.vue"),
    },
    {
      path: "/content-preview",
      name: "content-preview",
      component: () => import("../views/ContentPreview.vue"),
    },
  ],
});

export default router;
