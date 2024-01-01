import React, { lazy } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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
    <Navigate to="/auth/signup" />
  );
};
