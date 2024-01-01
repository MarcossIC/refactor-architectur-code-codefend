import React, { Suspense } from "react";
import { Outlet } from "react-router";
import { Logo } from "../../components";
import { Link, useLocation } from "react-router-dom";
import "./authPage.scss";

const AuthPage = () => {
  const location = useLocation();
  return (
    <section className="access log-component">
      <div className="container">
        <div className="brand">
          <Logo theme={"shadow"} />
        </div>
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
  );
};

export default AuthPage;
