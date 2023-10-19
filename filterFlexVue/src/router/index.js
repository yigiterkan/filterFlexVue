import { createRouter, createWebHistory } from "vue-router";
import DataTable from "../views/DataTable.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "DataTable",
      component: DataTable,
    },
    {
      path: "/DataTable",
      name: "DataTable",

      component: DataTable,
    },
  ],
});

export default router;
