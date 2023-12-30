import React from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./app.scss";
import { Suspense, Routes, Route } from "react-router-dom";
import { AuthPage } from "./views/pages";
import { Loader } from "./views/components";

const App = () => {
  const token = "";

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/auth" element={<AuthPage />}></Route>
      </Routes>
    </Suspense>
  );
};

export default App;
