import React from "react";
import "../../shared/loader.scss";

const Spinner = () => <div className="spinner"></div>;

export const Loader = () => {
  return (
    <div className="loader loader-screen">
      <Spinner className="icon" />
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="loader loader-full">
      <Spinner className="small-icon" />
    </div>
  );
};

export const PageLoaderWhite = () => {
  return (
    <div className="loader loader-full">
      <Spinner className="small-icon" />
    </div>
  );
};

export const PageLoaderOverlay = () => {
  return (
    <div className="loader loader-full overlay">
      <Spinner className="small-icon" />
    </div>
  );
};
