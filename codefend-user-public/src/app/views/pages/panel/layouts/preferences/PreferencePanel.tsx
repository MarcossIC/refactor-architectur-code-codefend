import { useEffect, useState } from "react";
import { usePreferences } from "../../../../../data";
import { PageLoader } from "../../../../../views/components";
import SettingCollaboratorAndTeam from "./components/SettingCollaboratorAndTeam";
import SettingCompanyInformation from "./components/SettingCompanyInformation";
import SettingOrderAndBilling from "./components/SettingOrderAndBilling";
//import SettingPersonalDetails from "./components/SettingPersonaDetails";


const PreferencePanel = () => {
  const [showScreen, setShowScreen] = useState(false);
  const {loading, data} = usePreferences()

  const preferencesInfoData = () => {
    const preferencesData = loading ? [] : data;
    return preferencesData;
  };

  useEffect(() => {
    setTimeout(() => {
      setShowScreen(true);
    }, 50);
  });

	return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <section className="left">
            <SettingOrderAndBilling
              isLoading={loading}
              orders={preferencesInfoData() ?? []}
            />
            <SettingCollaboratorAndTeam
              isLoading={loading}
              members={preferencesInfoData() ?? []}
            />
          </section>
          <section className="right">
            <SettingCompanyInformation
              companyInfo={preferencesInfoData() ?? []}
            />
            {/* <SettingPersonalDetails /> */}
          </section>
        </>
      )}
    </>
  );
};

export default PreferencePanel;
