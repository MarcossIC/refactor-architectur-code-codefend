import React, { lazy, Suspense } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./Router";
import { store } from "./data/redux/store";
import { Provider } from "react-redux";
import { Loader } from "./views/components";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <AppRouter />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
