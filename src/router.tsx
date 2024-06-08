import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  { index: true, lazy: () => import("./pages/index") },
  { path: "*", lazy: () => import("./pages/NotFound") },

  {
    lazy: () => import("./pages/layout-private"),
    children: [
      {
        path: "/new-search",
        lazy: () => import("./pages/NewSearch/index"),
      },
    ],
  },
]);
