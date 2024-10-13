import { createRouter, createWebHistory } from "vue-router";

/** Layouts */
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import EditorLayout from "@/layouts/EditorLayout.vue";

/** Views */
import HomeView from "../views/HomeView.vue";

import ListComponents from "../views/components/ListComponents.vue";
import EditComponent from "../views/components/EditComponent.vue";
import ViewComponent from "../views/components/ViewComponent.vue";

import ListPages from "../views/pages/ListPages.vue";
import EditPage from "../views/pages/EditPage.vue";
import ViewSite from "@/views/sites/ViewSite.vue";
import CreatePage from "@/views/pages/CreatePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: DashboardLayout,
      children: [
        {
          name: "home",
          path: "",
          component: HomeView,
        },
        {
          name: "settings",
          path: "/settings",
          component: ViewSite,
        },
        {
          name: "components",
          path: "/components",
          component: ListComponents,
        },
        {
          name: "component",
          path: "/components/:id",
          component: ViewComponent,
        },
        {
          name: "pages",
          path: "/pages",
          component: ListPages,
        },
      ],
    },
    {
      path: "/components/:id/edit",
      name: "editComponentLayout",
      component: EditorLayout,
      children: [
        {
          name: "edit-component",
          path: "/components/:id/edit",
          component: EditComponent,
        },
      ],
    },
    {
      path: "/pages/:id",
      name: "editPageLayout",
      component: EditorLayout,
      children: [
        {
          name: "new-pages",
          path: "/pages/create",
          component: CreatePage,
        },
        {
          name: "edit-pages",
          path: "/pages/:id/edit",
          component: EditPage,
        },
      ],
    },
  ],
});

export default router;
