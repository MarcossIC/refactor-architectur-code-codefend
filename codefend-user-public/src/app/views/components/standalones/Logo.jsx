import React from "react";

export const Logo = ({ theme }) => {
  const themeToImage = {
    light: { path: "/codefend/logo-light.svg", styles: "w-[120px] h-[30px]" },
    dark: { path: "/codefend/logo-dark.svg", style: "w-[120px] h-[30px]" },
    shadow: { path: "/codefend/logo-shadow.png", style: "" },
    aim: { path: "/codefend/aim-light.svg", style: "h-[30px]" },
  };

  const selectedLogo = themeToImage[theme];

  return (
    <>
      <div id="brand" className="brand-img">
        <img
          src={selectedLogo.path}
          class={selectedLogo.styles}
          alt="Codefend Logo"
          loading="lazy"
        />
      </div>
    </>
  );
};
