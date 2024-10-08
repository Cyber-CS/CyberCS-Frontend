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
            path: "/result-dashboard",
            lazy: () => import("./pages/Result/ResultDashboard"),
          },
          {
            path: "/profile",
            lazy: () => import("./pages/Profile/index"),
          },
          {
            path: "/register",
            lazy: () => import("./pages/Register/index"),
          },
          {
            path: "/user-management",
            lazy: () => import("./pages/UserManagement/index"),
          },
          {
            path: "/virus-total",
            lazy: () => import("./pages/Virustotal/VirusTotalPage"), 
          },
          {
            path: "/hibp",
            lazy: () => import("./pages/HIBP/HIBPCheckPage"), 
          },
          {
            path: "/gerenciar-empresas", 
            lazy: () => import("./pages/Empresa/EmpresaPage"),
          },
          {
            path: "/searh-empresa", 
            lazy: () => import("./pages/Empresa/SearchByHashPage"),
          },
          {
            path: "/recent-results", 
            lazy: () => import("./pages/Empresa/RecentResultsPage"),
          },
        ],
      },
    ],
  },
]);
