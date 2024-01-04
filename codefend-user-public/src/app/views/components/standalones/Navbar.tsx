import React, { ReactNode, lazy } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../data/redux/slices/auth.slice";
import "../../shared/navbar.scss";
import { clearAuth, useAppSelector } from "../../../data";
import { LogoutIcon } from "..";

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
  const userData = useAppSelector((state) => state);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/signin");
    clearAuth();
  };

  return (
    <>
      <nav>
        <NavbarSelector />

        <div className="container">
          <Link to="/">
            <span className="brand-container">
              <Logo theme="aim" />
            </span>
          </Link>
        </div>

        <div>
          <span>{userData.authReducer.userData?.email}</span>
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
