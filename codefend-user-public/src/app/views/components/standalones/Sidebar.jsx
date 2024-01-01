import React from "react";
import { Link, useLocation } from "react-router-dom";

import "../../shared/sidebar.scss";

const isActivePath = (verifyPath) => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (pathName === "/" && path === "/dashboard") return "active";
  return currentPath === verifyPath ? "active" : "";
};

const AdminSidebar = () => {
  return (
    <>
      <Link
        title="Admin Panel"
        to="/admin/panel"
        className={isActivePath("/admin/panel")}
      >
        * Square Plus *
      </Link>

      <Link to="/admin/company" className={isActivePath("/admin/panel")}>
        * Regular Building *
      </Link>
    </>
  );
};

const Sidebar = ({}) => {
  return (
    <aside className="sidebar">
      <Link
        title="Dashboard"
        to="/dashboard"
        className={isActivePath("/dashboard")}
      >
        * Char Icon *
      </Link>

      <Link title="Web" to="/web" className={isActivePath("/web")}>
        * Globe Icon *
      </Link>

      <Link title="Mobile" to="/mobile" className={isActivePath("/mobile")}>
        * Mobile Screen *
      </Link>

      <Link title="Cloud" to="/cloud" className={isActivePath("/cloud")}>
        * Cloud Icon *
      </Link>

      <Link title="Enp" to="/enp" className={isActivePath("/enp")}>
        * Card *
      </Link>

      <Link
        title="Social Engineering"
        to="/social"
        className={isActivePath("/social")}
      >
        * PeopleGroup *
      </Link>

      <Link title="Issues" to="/issues" className={isActivePath("/issues")}>
        * Bug *
      </Link>

      <Link
        title="Customer Support"
        to="/support"
        className={isActivePath("/support")}
      >
        * Message *
      </Link>

      {false && true && <AdminSidebar />}

      <Link to="/preferences" className={isActivePath("/preferences")}>
        * Gear *
      </Link>

      <Link title="Inx" to="/inx" className={isActivePath("/inx")}>
        * Si power routemate *
      </Link>

      <Link title="Sns" to="/sns" className={isActivePath("/sns")}>
        * Database *
      </Link>

      <Link title="Vdb" to="/vdb" className={isActivePath("/vdb")}>
        * Database *
      </Link>
    </aside>
  );
};

export default Sidebar;
