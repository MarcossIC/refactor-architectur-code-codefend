import React, { lazy } from "react";
import { Link } from "react-router-dom";

const Logo = lazy(() => import("./Logo"));

const NavbarContainer = ({ chilldren, show }) => {
  return (
    <div className={show ? "block" : "hidden"}>
      <div
        onClick={() => {
          console.log("Close Modal");
        }}
        className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-20 z-20"
      >
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="max-h-full max-w-xl overflow-y-auto bg-white"
        >
          {chilldren}
        </div>
      </div>
    </div>
  );
};

const NavbarLogoutConfirm = () => {
  return (
    <div className="w-full mt-4">
      <div className="w-full px-8 disable-border">
        <div className="p-3 flex">
          <p className="text-small text-left font-bold title-format">
            Are you sure you want to Logout?
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              console.log("close modal");
            }}
            className="btn btn-secondary mr-2"
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

        <div className="container flex items-center justify-center  mx-auto p-3 text-format"></div>
      </div>
    </div>
  );
};

const NavbarSelector = () => {
  return (
    <div className="w-full">
      <div className="w-full internal-tables">
        <div className="p-3 internal-tables-active flex">
          <p className="text-small text-left font-bold title-format">
            Select a company
          </p>
        </div>
        <div className="container flex items-center justify-center  mx-auto p-3 text-format"></div>
      </div>
    </div>
  );
};

const Navbar = ({}) => {
  const { user, setUser } = createUser;
  const { showModal, setShowModal, setShowModalStr, showModalStr } =
    createModal;

  return (
    <header>
      <nav>
        <NavbarContainer show={showModal()}>
          {showModalStr() === "logout_confirmation" ? (
            <NavbarLogoutConfirm />
          ) : (
            <NavbarSelector />
          )}
        </NavbarContainer>
        <div className="flex items-center cursor-pointer">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              <Logo theme="aim" />
            </span>
          </Link>
        </div>

        <div title="Logout" className="power-off cursor-pointer">
          <span
            onClick={(e) => {
              console.log("");
            }}
          >
            *Logout Icon*
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
