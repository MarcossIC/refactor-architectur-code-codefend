import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router";
import { Link, useLocation } from "react-router-dom";

import "./auth.scss";
import "../../shared/buttons.scss";
import "../../shared/forms.scss";

const Logo = lazy(() => import("../../components/standalones/Logo"));

const isActivePath = (currentPath) => {
  const location = useLocation();

  if (location.pathname.startsWith("/auth/signup")) return "active";
  return location.pathname === currentPath ? "active" : "";
};

const AuthPage = () => {
  return (
    <>
      <div className="codefend-img-bg">
        <Logo theme={"shadow"} />
      </div>
      <section className="access">
        <div className="container">
          <div className="brand"></div>
          <div className="forms">
            <div className="nav">
              <span
                className={location.pathname === "/auth/signin" ? "active" : ""}
              >
                <Link to="/auth/signin">access</Link>
              </span>
              <span
                className={
                  location.pathname.startsWith("/auth/signup") ? "active" : ""
                }
              >
                <Link to="/auth/signup">new user</Link>
              </span>
            </div>
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthPage;
