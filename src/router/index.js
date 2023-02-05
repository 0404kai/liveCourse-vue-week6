import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "首頁",
      component: () => import("../views/HomeView.vue"),
      children: [
        {
          path: "/productsList",
          name: "前台產品列表",
          component: () => import("../views/frontend/ProductsList.vue"),
        },
        {
          path: "/cart",
          name: "購物車",
          component: () => import("../views/frontend/Cart.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "登入頁面",
      component: () => import("../views/frontend/Login.vue"),
    },
    {
      path: "/admin",
      name: "後台",
      component: () => import("../views/backend/HomeView.vue"),
      children: [
        {
          path: "products",
          name: "後台產品列表",
          component: () => import("../views/backend/ProductList.vue"),
        },
        {
          path: "orders",
          name: "後台訂單列表",
          component: () => import("../views/backend/OrderList.vue"),
        },
      ]
    },
  ],
});

export default router;
