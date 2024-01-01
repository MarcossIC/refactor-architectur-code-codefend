import React, { lazy, Suspense } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./app.scss";

import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { store } from "./views/redux/store";
import { Provider } from "react-redux";

const Loader = lazy(() => import("./views/components/standalones/Loader"));
/*
const AuthPage = lazy(() => import("./views/pages/auth/AuthPage"));
const SignInLayout = lazy(() => import("./views/pages/auth/layouts/signin"));
const SignUpLayout = lazy(() => import("./views/pages/auth/layouts/signup"));
const FinishSignUpLayout = lazy(() =>
  import("./views/pages/auth/layouts/finishsignUp")
);*/

const App = () => {
  const token = "";

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
