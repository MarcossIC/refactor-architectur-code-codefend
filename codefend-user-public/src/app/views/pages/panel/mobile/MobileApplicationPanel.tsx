import React, { useCallback, useEffect, useState } from "react";
import { PageLoader, ModalWrapper, EmptyScreenView } from "../../../components";
import "../../../shared/card.scss";
import { MobileAppCard } from "../components/MobileAppCard";

interface Mobile {
  app_name: string;
  model: string;
}

interface MobileInfo {
  info: Mobile[];
  loading: boolean;
  disponibles: [];
}

type RefetchFunction = { (): void };

interface MobileApp {
  id: string;
}

function generateMobileInfoMock(): [MobileInfo, { refetch: RefetchFunction }] {
  const mobileInfo: MobileInfo = {
    info: [{ app_name: "ExampleBrand", model: "ExampleModel" }],
    loading: false,
    disponibles: [],
  };

  const refetch: RefetchFunction = () => {
    console.log("Mock Refetch Function Called");
  };

  return [mobileInfo, { refetch }];
}

const MobileApplicationPanel: React.FC = () => {
  const [showScreen, setShowScreen] = useState(false);
  const [selectedMobileApp, setSelectedMobileApp] = useState<MobileApp>(
    {} as MobileApp
  );

  const [mobileInfo, { refetch }] = generateMobileInfoMock();

  const getMobileInfo = () => {
    const mobileData = mobileInfo.loading ? [] : mobileInfo.disponibles;
    const mobileDataGroup = mobileData ?? [];
    return mobileDataGroup;
  };

  const handleMobileAppClick = useCallback(
    (mobile: any) => {
      if (mobile.id === selectedMobileApp.id) return;

      setSelectedMobileApp(mobile);
    },
    [setSelectedMobileApp]
  );

  const handleActiveMobileValidation = useCallback(
    (mobile: any) => {
      return mobile.id === selectedMobileApp.id;
    },
    [selectedMobileApp]
  );

  useEffect(() => {
    setTimeout(() => setShowScreen(true), 50);
  }, []);

  useEffect(() => {
    if (selectedMobileApp === null) {
      const mobileData = getMobileInfo();
      if (!mobileInfo.loading && Boolean(mobileData.length))
        setSelectedMobileApp(mobileData[0]);
    }
  }, [selectedMobileApp]);

  return (
    <>
      <main className={`mobile ${showScreen ? "actived" : ""}`}>
        {!mobileInfo.loading ? (
          <>
            {!Boolean(mobileInfo.info.length) ? (
              <>
                <EmptyScreenView buttonText="Add Mobile" event={() => {}} />
              </>
            ) : (
              <>
                <section className="left">
                  <div className="add-button">
                    <button
                      onClick={(e: React.FormEvent) => {}}
                      className="btn btn-primary"
                    >
                      ADD MOBILE APP
                    </button>
                  </div>

                  <div className="list">
                    {mobileInfo.info.map((info: any) => (
                      <div
                        key={info.app_name}
                        className="mobile-info"
                        onClick={() => handleMobileAppClick(info)}
                      >
                        <>
                          <MobileAppCard
                            active={handleActiveMobileValidation(info)}
                            onDone={(id: any) => {
                              if (
                                selectedMobileApp &&
                                selectedMobileApp.id === id
                              ) {
                                setSelectedMobileApp({} as MobileApp);
                              }
                            }}
                            type={"mobile"}
                            {...info}
                            name={info.app_name}
                          />
                        </>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="right">
                  {selectedMobileApp && <></>}
                </section>
              </>
            )}
          </>
        ) : (
          <>
            <PageLoader />
          </>
        )}
      </main>
    </>
  );
};

export default MobileApplicationPanel;
