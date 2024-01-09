import React, { useEffect, useState } from 'react';

import DashboardSearchbar from './components/DashboardSearchbar';
import DashboardCollaborators from './components/DashboardCollaborators';
import DashboardAssets from './components/DashboardAssets';
import DashboardChart from './components/DashboardChart';
import DashboardVulnerabilitiesStatus from './components/DashboardVulnerabilitiesStatus';
import DashboardVulnerabilities from './components/DashboardVulnerabilities';

import { useDashboard } from '../../../../../data';
import '../../../../styles/flag.scss';
import '../../../../styles/card.scss';
import '../../../../styles/buttons.scss';
import './dashboard.scss';

const Dashboard: React.FC = () => {
	const { isLoading, companyData } = useDashboard();
	const [showScreen, setShowScreen] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowScreen(true);
		}, 50);
	}, []);

	return (
		<main className={` dashboard ${showScreen ? 'actived' : ''}`}>
			<section className="left">
				<DashboardSearchbar />
				<DashboardVulnerabilities
					isLoading={isLoading}
					topVulnerabilities={companyData.issues ?? []}
				/>
				<DashboardAssets resources={companyData.resources ?? {}} />
				<DashboardCollaborators
					isLoading={isLoading}
					members={companyData.members ?? []}
				/>
			</section>

			<section className="right">
				<DashboardChart
					vulnerabilityByRisk={companyData.issuesShare ?? {}}
					isLoading={isLoading}
				/>
				<DashboardVulnerabilitiesStatus
					vulnerabilityByShare={companyData.issuesCondicion ?? {}}
				/>
			</section>
		</main>
	);
};

export default Dashboard;
