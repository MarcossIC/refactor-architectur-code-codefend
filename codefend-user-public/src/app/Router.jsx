import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RouterLayout } from "./RouterLayout";
import Home from "./views/pages/dashboard/index";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = lazy(() => import("./views/pages/auth/AuthPage"));
const SignInLayout = lazy(() => import("./views/pages/auth/layouts/signin"));
const SignUpLayout = lazy(() => import("./views/pages/auth/layouts/signup"));
const ConfirmationSignUp = lazy(() =>
  import("./views/pages/auth/layouts/confirmationSignUp")
);

export const AppRouter = () => {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        {/* Rutas privadas */}
        <Route path="/" element={<RouterLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Rutas públicas para login y registro */}
        <Route path="/auth" element={<AuthPage />}>
          <Route index element={<Navigate to="signin" replace />} />
          <Route path="signin" element={<SignInLayout />} />
          <Route path="signup" element={<SignUpLayout />} />
          <Route path="signup/:ref" element={<ConfirmationSignUp />} />
        </Route>
      </Routes>
    </>
  );
};
