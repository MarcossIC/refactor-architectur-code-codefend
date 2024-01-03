import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router";
import { Link, useLocation } from "react-router-dom";

const Logo = lazy(() => import("../../components/standalones/Logo"));

const isActivePath = (currentPath) => {
  const location = useLocation();

  if (location.pathname.startsWith("/auth/signup")) return "active";
  return location.pathname === currentPath ? "active" : "";
};

const AuthPage = () => {
  return (
    <section className="access log-component">
      <div className="container">
        <div className="brand">
          <Logo theme={"shadow"} />
        </div>
        <div className="forms">
          <div className="nav">
            <span className={ location.pathname === isActivePath("/auth/signin")}>
              <Link to="/auth/signin">access</Link>
            </span>
            <span className={isActivePath("/auth/signup")}>
              <Link to="/auth/signup">new user</Link>
            </span>
          </div>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
