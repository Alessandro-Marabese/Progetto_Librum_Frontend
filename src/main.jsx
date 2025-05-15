import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store/index.js";
import AppWrapper from "./App";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);
