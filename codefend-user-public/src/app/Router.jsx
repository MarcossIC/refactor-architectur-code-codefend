import { Routes, Route } from "react-router-dom";
import { SignUpLayout } from "./views/pages/auth/layouts/signup";
import { SignInLayout } from "./views/pages/auth/layouts/signin";
import { RouterLayout } from "./RouterLayout";
import Home from '../app/views/pages/dashboard';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppRouter = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
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
          <Route path="/" element={<Home />} />
        </Route>

        {/* Rutas públicas para login y registro */}
        <Route path="/auth/signup" element={<SignUpLayout />} />
        <Route path="/auth/signin" element={<SignInLayout />} />
      </Routes>
    </div>
  );
};
