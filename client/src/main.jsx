import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import AppRout from "./Router/AppRout.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRout />
  </Provider>,
);
