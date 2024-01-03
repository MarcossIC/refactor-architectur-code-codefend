import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { LogoutIcon } from "../icons";

const Logo = lazy(() => import("./Logo"));

const NavbarContainer = ({ chilldren, show }) => {
  return show ? (
    <div
      onClick={() => {
        console.log("Close Modal");
      }}
      className="wrapper"
    >
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="wrapper-content"
      >
        {chilldren}
      </div>
    </div>
  ) : (
    <></>
  );
};

const NavbarLogoutConfirm = () => {
  return (
    <div className="logout-confirm-container">
      <div className="logout-confirm-content disable-border">
        <div className="title-content">
          <p className="text-small title-format">
            Are you sure you want to Logout?
          </p>
        </div>

        <div className="buttons">
          <button
            onClick={() => {
              console.log("close modal");
            }}
            className="btn btn-secondary"
          >
            cancel
          </button>
          <button
            onClick={(e) => {
              console.log("Log out");
            }}
            className="btn btn-primary"
          >
            logout
          </button>
        </div>

        <div className="helper-box text-format"></div>
      </div>
    </div>
  );
};

const NavbarSelector = () => {
  return (
    <div style={styles}>
      <div className="internal-tables">
        <div className="internal-tables-active full-w flex pad-3">
          <p className="select title-format">Select a company</p>
        </div>
        <div className="helper-box text-format"></div>
      </div>
    </div>
  );
};

const Navbar = ({}) => {
  const { user, setUser } = { user: "", setUser: () => {} };
  const { showModal, setShowModal, setShowModalStr, showModalStr } = {
    showModal: false,
    setShowModal: () => {},
    setShowModalStr: () => "",
    showModalStr: "",
  };

  return (
    <>
      <nav>
        <NavbarContainer show={showModal}>
          {showModalStr === "logout_confirmation" ? (
            <NavbarLogoutConfirm />
          ) : (
            <NavbarSelector />
          )}
        </NavbarContainer>
        <div className="container">
          <Link to="/">
            <span className="brand-container">
              <Logo theme="aim" />
            </span>
          </Link>
        </div>

        <div title="Logout" className="power-off">
          <span
            onClick={(e) => {
              console.log("");
            }}
          >
            <LogoutIcon />
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
