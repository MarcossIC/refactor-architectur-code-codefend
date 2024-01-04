<<<<<<< HEAD:codefend-user-public/src/app/views/components/standalones/Navbar.jsx
import React, { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
=======
import React, { ReactNode, lazy } from "react";
import { useDispatch } from "react-redux";
>>>>>>> fd091e34024790712286adf6882852f79b2de3c6:codefend-user-public/src/app/views/components/standalones/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../data/redux/slices/auth.slice";
import { clearAuth } from "../../../data";
import { LogoutIcon } from "../icons";
import "../../shared/navbar.scss";

const Logo = lazy(() => import("./Logo"));

interface NavbarContainer {
  children?: ReactNode;
  show: boolean;
}

const NavbarContainer: React.FC<NavbarContainer> = ({ children, show }) => {
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
        {children}
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
          <button className="btn btn-primary" aria-label="Log out">
            logout
          </button>
        </div>

        <div className="helper-box text-format"></div>
      </div>
    </div>
  );
};

const NavbarSelector: React.FC = () => {
  return (
    <div>
      <div className="internal-tables navbar-selector">
        <div className="internal-tables-active navbar-selector_content">
          <p className="select title-format">Select a company</p>
        </div>
        <div className="helper-box text-format"></div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state)

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/signin");
    clearAuth();
  };

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

        <div>
          <span>{userData.email}</span>
        </div>

        <div title="Logout" className="power-off">
          <span onClick={handleLogout}>
            <LogoutIcon />
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
