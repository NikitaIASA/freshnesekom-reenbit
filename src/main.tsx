import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@store/store";

import App from "./App.tsx";

import "@styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
