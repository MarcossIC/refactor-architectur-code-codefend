import { useEffect, useState } from 'react';
import { usePreferences } from '../../../../../data';
import { PageLoader, Show } from '../../../../../views/components';
import SettingCollaboratorAndTeam from './components/SettingCollaboratorAndTeam';
import SettingCompanyInformation from './components/SettingCompanyInformation';
import SettingOrderAndBilling from './components/SettingOrderAndBilling';
import '../../../../styles/flag.scss';
import '../../../../styles/table.scss';

const PreferencePanel = () => {
	const [showScreen, setShowScreen] = useState(false);
	const { loading, data } = usePreferences();

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
			<Show when={showScreen} fallback={<PageLoader />}>
				<main className={`preferences ${showScreen ? 'actived' : ''}`}>
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
				</main>
			</Show>
		</>
	);
};

export default PreferencePanel;
