import React from "react";
import "../../shared/loaders.scss";

const Spinner = ({ icon }) => <div className={`spinner ${icon}`}></div>;

export const Loader = () => {
  return (
    <div className="loader loader-screen">
      <Spinner icon="icon" />
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="loader loader-full">
      <Spinner icon="small-icon" />
    </div>
  );
};

export const PageLoaderWhite = () => {
  return (
    <div className="loader loader-full">
      <Spinner icon="small-icon" />
    </div>
  );
};

export const PageLoaderOverlay = () => {
  return (
    <div className="loader loader-full overlay">
      <Spinner icon="small-icon" />
    </div>
  );
};
