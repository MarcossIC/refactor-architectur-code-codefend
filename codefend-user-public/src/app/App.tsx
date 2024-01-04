import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./Router";
import { store } from "./data/redux/store";
import { Provider } from "react-redux";
import { Loader } from "./views/components";

export const App: React.FC<void> = () => {
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

