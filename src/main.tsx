import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { SessionProvider } from "./session/SessionProvider.tsx";
import { SecurityProvider } from "./security/SecurityProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { router } from "./router";
// import { Loading } from "./components";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <SecurityProvider>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} fallbackElement={<p>Carregando</p>} />
        </QueryClientProvider>
      </SecurityProvider>
    </SessionProvider>
  </StrictMode>
);
