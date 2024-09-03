import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("./pages/layout-root"),
    children: [
      {
        index: true,
        lazy: () => import("./pages/index"),
      },
      { path: "*", lazy: () => import("./pages/NotFound") },
      { path: "security", lazy: () => import("./pages/Security") },
      {
        lazy: () => import("./pages/layout-private"),
        children: [
          {
            path: "/new-search",
            lazy: () => import("./pages/NewSearch/index"),
          },
          {
            path: "/result/:searchId",
            lazy: () => import("./pages/Result/index"),
          },
          {
            path: "/profile",
            lazy: () => import("./pages/Profile/index"),
          },
          {
            path: "/register",
            lazy: () => import("./pages/Cadastro/UserRegistration"),
          },
          {
            path: "/user-management",
            lazy: () => import("./pages/UserManagement/UserManagement"),
          },
        ],
      },
    ],
  },
]);
