import React, { lazy, Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "./views/components";
import { useAppSelector } from "./data";

const Navbar = lazy(() => import("./views/components/standalones/Navbar"));
const Sidebar = lazy(() => import("./views/components/standalones/Sidebar"));

export const RouterLayout: React.FC = () => {
  const {isAuth} = useAppSelector((state) => state.authReducer); //esto viene de redux store
  //console.log(state)

  return isAuth  ?
    <>
      <Navbar />
      <Sidebar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </> : <Navigate to="/auth/signin" />
    ;
};
