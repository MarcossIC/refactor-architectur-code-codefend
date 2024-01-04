import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "./views/components";

const Navbar = lazy(() => import("./views/components/standalones/Navbar"));
const Sidebar = lazy(() => import("./views/components/standalones/Sidebar"));

export const RouterLayout: React.FC = () => {
  const isAuth = useSelector((state) => state); //esto viene de redux store
  console.log(isAuth.authReducer.isAuth);

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
