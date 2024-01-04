import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChartIcon,
  GlobeWebIcon,
  MobileIcon,
  CLoudIcon,
  LanIcon,
  EnpIcon,
  SourceCodeIcon,
  PeopleGroup,
  BugIcon,
  MessageIcon,
  PreferenceIcon,
  InxIcon,
  DataIcon,
} from "../icons";

import "../../shared/sidebar.scss";

const isActivePath = (verifyPath) => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === "/" && verifyPath === "/dashboard") return "active";
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
        <ChartIcon />
      </Link>

      <Link to="/admin/company" className={isActivePath("/admin/panel")}>
        <ChartIcon />
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
        <ChartIcon />
      </Link>

      <Link title="Web" to="/web" className={isActivePath("/web")}>
        <GlobeWebIcon />
      </Link>

      <Link title="Mobile" to="/mobile" className={isActivePath("/mobile")}>
        <MobileIcon />
      </Link>

      <Link title="Cloud" to="/cloud" className={isActivePath("/cloud")}>
        <CLoudIcon />
      </Link>

      <Link title="Lan" to="/lan" className={isActivePath("/lan")}>
        <LanIcon />
      </Link>

      <Link title="Enp" to="/enp" className={isActivePath("/enp")}>
        <EnpIcon />
      </Link>

      <Link
        title="Source Code"
        to="/source"
        className={isActivePath("/source")}
      >
        <SourceCodeIcon />
      </Link>

      <Link
        title="Social Engineering"
        to="/social"
        className={isActivePath("/social")}
      >
        <PeopleGroup />
      </Link>

      <Link title="Issues" to="/issues" className={isActivePath("/issues")}>
        <BugIcon />
      </Link>

      <Link
        title="Customer Support"
        to="/support"
        className={isActivePath("/support")}
      >
        <MessageIcon />
      </Link>

      {false && true && <AdminSidebar />}

      <Link to="/preferences" className={isActivePath("/preferences")}>
        <PreferenceIcon />
      </Link>

      <Link title="Inx" to="/inx" className={isActivePath("/inx")}>
        <InxIcon />
      </Link>

      <Link title="Sns" to="/sns" className={isActivePath("/sns")}>
        <DataIcon />
      </Link>

      <Link title="Vdb" to="/vdb" className={isActivePath("/vdb")}>
        <DataIcon />
      </Link>
    </aside>
  );
};

export default Sidebar;
