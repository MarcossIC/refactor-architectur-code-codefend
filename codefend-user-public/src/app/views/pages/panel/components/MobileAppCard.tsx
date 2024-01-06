import React from "react";
import { defaultMobileCloudResourceAsset } from "../../../../data/mocks";

interface MobileAppCardProps {
  active?: (state?: any) => void;
  onDone?: (state?: string) => void;
  type: string;
  name: string;
  isMainNetwork?: any;
  showDetails?: boolean;
  appMedia?: boolean;
  isMobile?: boolean;
  cloudProvider?: string;
  id?: string;
  appDesc?: any;
  appDeveloper?: string;
  appRank?: string;
  appReviews?: string;
}

export const MobileAppCard: React.FC<MobileAppCardProps> = (props) => {
  const isMainGoogleNetwork = Boolean(props.isMainNetwork);
  const isDetails = Boolean(props.showDetails);
  const isMobileScreen = props.type === "mobile";
  const isImage = props.appMedia;
  const deleteText = isMobileScreen ? "delete mobile" : "delete cloud";

  return (
    <>
      {true ?? (
        <div className="mobile-card-delete">
          {" Add Mobile cloud deleted modal "}
        </div>
      )}
      <div
        className={`mobile-card-main ${
          isDetails || props.isMobile ? "mobile-detail" : "mobile-card"
        } ${props.active ?? "active"}`}
      >
        {(isDetails || props.isMobile) && (
          <div className="mobile-cloud-delete" onClick={(e) => {}}>
            <span>{deleteText}</span>
            <span>X</span>
          </div>
        )}

        <div className="card-main-content">
          <div className="card-img">
            {isImage ? (
              <img
                src={`data:image/png;base64,${props.appMedia}`}
                alt="mobile-image"
              />
            ) : (
              <img
                src={
                  defaultMobileCloudResourceAsset.includes(props.name)
                    ? `/codefend/${props.name}.jpg`
                    : `/clouds/${
                        isMobileScreen
                          ? "android-ios.jpeg"
                          : `${
                              props.cloudProvider
                                ? `${props.cloudProvider}.png`
                                : "aws.png"
                            }`
                      }`
                }
                alt="mobile-image"
              />
            )}
          </div>
          <div className="main-content">
            <div className="details">
              <span className={`${isDetails ?? "text-red-500"}`}>
                {isMainGoogleNetwork ? "main google network" : props.name}
              </span>
              {isDetails && (
                <span className="second-text">resource id: {props.id}</span>
              )}
            </div>
            <div className="optional-details text-gray">
              {isMainGoogleNetwork ? (
                <>
                  <span>
                    This is our main GCP network. Please handle with care.
                  </span>
                </>
              ) : (
                <>
                  <span
                    className={`app-desc ${
                      props.isMobile ? "isMobile" : "notMobile"
                    }`}
                  >
                    {props.appDesc ?? ""}
                  </span>
                  {!props.isMobile && (
                    <>
                      <span>{props.appDeveloper ?? ""}</span>
                      <div className="reviews">
                        <span>{props.appRank ?? ""}</span>
                        {props.appReviews && <span>•</span>}
                        <span>
                          {" "}
                          {props.appReviews
                            ? `${props.appReviews} reviews`
                            : ""}
                        </span>
                        {isMobileScreen && (
                          <div>
                            <img src="/codefend/rank.svg" alt="star-icon" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
