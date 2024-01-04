import React from "react";
import "../../shared/loaders.scss";

/**
 * Spinner para los loaders hecho solo con css
 * @param {string} icon - Clase css de "loaders.scss" que define el tamaño del Spinner
 */
const Spinner: React.FC<{ icon: string }> = ({ icon }) => (
  <div className={`spinner ${icon}`}></div>
);

export const Loader: React.FC = () => {
  return (
    <div className="loader loader-screen">
      <Spinner icon="icon" />
    </div>
  );
};

export const PageLoader: React.FC = () => {
  return (
    <div className="loader loader-full">
      <Spinner icon="small-icon" />
    </div>
  );
};

export const PageLoaderWhite: React.FC = () => {
  return (
    <div className="loader loader-full">
      <Spinner icon="small-icon" />
    </div>
  );
};

export const PageLoaderOverlay: React.FC = () => {
  return (
    <div className="loader loader-full overlay">
      <Spinner icon="small-icon" />
    </div>
  );
};
