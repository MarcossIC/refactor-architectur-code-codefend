import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Navbar = lazy(() => import("./views/components/standalones/Navbar"));

export const RouterLayout = () => {
  const { isAuth } = useSelector((state) => state); //esto viene de redux store

  //este componente es el Outlet, envuelve a la applicacion
  return isAuth ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/auth/signin" />
  );
};
