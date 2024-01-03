import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "./views/components";

const Navbar = lazy(() => import("./views/components/standalones/Navbar"));
const Sidebar = lazy(() => import("./views/components/standalones/Sidebar"));

export const RouterLayout = () => {
  const { isAuth } = useSelector((state) => state); //esto viene de redux store

  //este componente es el Outlet, envuelve a la applicacion
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
