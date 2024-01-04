import React, { Suspense, lazy } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import "./auth.scss";
import "../../shared/buttons.scss";
import "../../shared/forms.scss";

const Logo = lazy(() => import("../../components/standalones/Logo"));

const AuthPage: React.FC = () => {
  const location = useLocation();

  const isActivePath = (currentPath: string) => {
    if (location.pathname.startsWith("/auth/signup")) return "active";
    return location.pathname === currentPath ? "active" : "";
  };

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
              <span className={isActivePath("/auth/signin")}>
                <Link to="/auth/signin">access</Link>
              </span>
              <span className={isActivePath("/auth/signup")}>
                <Link to="/auth/signup">new user</Link>
              </span>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthPage;
