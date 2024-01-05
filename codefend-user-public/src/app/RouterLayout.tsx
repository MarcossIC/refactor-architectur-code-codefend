import React, { lazy, Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "./views/components";
import { useAppSelector } from "./data";
import AuthServices from "./data/services/auth.service";

const Navbar = lazy(() => import("./views/components/standalones/Navbar"));
const Sidebar = lazy(() => import("./views/components/standalones/Sidebar"));

export const RouterLayout: React.FC = () => {
  const isNotAuthenticated = AuthServices.verifyAuth();
  if (isNotAuthenticated) AuthServices.logout2();
  return !isNotAuthenticated ? (
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
