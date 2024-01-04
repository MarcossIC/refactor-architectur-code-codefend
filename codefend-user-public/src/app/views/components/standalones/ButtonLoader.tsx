import React from "react";
import "../../shared/loaders.scss";

const ButtonLoader: React.FC = () => {
  return (
    <>
      <button type="button" className="button-loader">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
        <span className="sr-only">Icon description</span>
      </button>
    </>
  );
};

export default ButtonLoader;
