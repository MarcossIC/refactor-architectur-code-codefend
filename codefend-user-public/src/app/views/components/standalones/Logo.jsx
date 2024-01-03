import React from "react";

const Logo = ({ theme }) => {
  const themeToImage = {
    light: {
      path: "/codefend/logo-light.svg",
      styles: { width: "120px", height: "30px" },
    },
    dark: {
      path: "/codefend/logo-dark.svg",
      styles: { width: "120px", height: "30px" },
    },
    shadow: { path: "/codefend/logo-shadow.png", styles: "" },
    aim: { path: "/codefend/aim-light.svg", styles: { height: "30px" } },
  };

  const selectedLogo = themeToImage[theme];

  return (
    <>
      <div id="brand" className="brand-img">
        <img
          src={selectedLogo.path}
          styles={selectedLogo.styles}
          alt="Codefend Logo"
          loading="lazy"
        />
      </div>
    </>
  );
};

export default Logo;
