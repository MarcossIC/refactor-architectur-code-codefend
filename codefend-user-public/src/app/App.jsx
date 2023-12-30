import React, { lazy, useEffect, useState, Suspense } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./app.scss";
import { Routes, Route, Navigate } from "react-router-dom";

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
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Falta logica para ir al login cuando no este logeado o al dashboard cuando lo este*/}
        <Route index element={<Navigate to="/auth" />} />

        <Route path="/loader" element={<Loader />} />
        {/*
                  <Route path="/auth" element={<AuthPage />}>
          <Route index element={<Navigate to="signin" replace />} />
          <Route path="signin" element={<SignInLayout />} />
          <Route path="signup" element={<SignUpLayout />} />
          <Route path="signup/:ref" element={<FinishSignUpLayout />} />
        </Route>
          */}

        <Route path="/auth" lazy={() => import("./views/pages/auth/AuthPage")}>
          <Route index element={<Navigate to="signin" replace />} />
          <Route
            path="signin"
            lazy={() => import("./views/pages/auth/layouts/signin")}
          />
          <Route
            path="signup"
            lazy={() => import("./views/pages/auth/layouts/signup")}
          />
          <Route
            path="signup/:ref"
            lazy={() => import("./views/pages/auth/layouts/finishsignUp")}
          />
        </Route>

        <Route path="/dashboard" element={<Loader />} />
        <Route path="/web" element={<Loader />} />
        <Route path="/mobile" element={<Loader />} />
        <Route path="/source" element={<Loader />} />
        <Route path="/social" element={<Loader />} />
        <Route path="/issues" element={<Loader />} />
        <Route path="/cloud" element={<Loader />} />
        <Route path="/lan" element={<Loader />} />
        <Route path="/preferences" element={<Loader />} />
        <Route path="/inx" element={<Loader />} />
        <Route path="/sns" element={<Loader />} />
        <Route path="/vdb" element={<Loader />} />
        <Route path="/enp" element={<Loader />} />
        <Route path="/companies" element={<Loader />} />
        <Route path="/support" element={<Loader />} />
        <Route path="/issues/:id" element={<Loader />} />

        {/*
          Falta logica para mostrar solo cuando el usuario sea Admin
          <Show when={isAuthUserAdmin}>
            <Route path="/admin/panel" element={AdminPanelView} />
            <Route path="/admin/company" element={AdminCompanyView} />
          </Show>
          
          */}
      </Routes>
    </Suspense>
  );
};

export default App;
