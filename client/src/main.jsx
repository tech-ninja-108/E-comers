import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import AppRout from "./Router/AppRout.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AppRout />
      <ToastContainer />
    </Provider>
  </QueryClientProvider>,
);
