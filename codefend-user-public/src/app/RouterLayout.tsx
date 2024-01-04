import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "./views/components";

const Navbar = lazy(() => import("./views/components/standalones/Navbar"));
const Sidebar = lazy(() => import("./views/components/standalones/Sidebar"));

export const RouterLayout: React.FC = () => {
  const isAuth = useSelector((state) => state); //esto viene de redux store

<<<<<<< HEAD:codefend-user-public/src/app/RouterLayout.jsx
  console.log(isAuth.authReducer.isAuth)
  //este componente es el Outlet, envuelve a la applicacion
=======
>>>>>>> fd091e34024790712286adf6882852f79b2de3c6:codefend-user-public/src/app/RouterLayout.tsx
  return isAuth ? (
    <>
      <Navbar />
      <Sidebar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  ) : (
    <Navigate to="/auth/signin" />
  );
};
