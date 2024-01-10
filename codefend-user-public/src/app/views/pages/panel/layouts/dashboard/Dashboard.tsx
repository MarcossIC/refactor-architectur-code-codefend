import React, { useEffect, useState } from 'react';

import DashboardSearchbar from './components/DashboardSearchbar';
import DashboardCollaborators from './components/DashboardCollaborators';
import DashboardAssets from './components/DashboardAssets';
import DashboardVulnerabilities from './components/DashboardVulnerabilities';

import { useDashboard } from '../../../../../data';
import { VulnerabilityRisk, VulnerabilitiesStatus } from '../../components/';
import '../../../../styles/flag.scss';
import './dashboard.scss';

const Dashboard: React.FC = () => {
	const { isLoading, companyData } = useDashboard();
	const [showScreen, setShowScreen] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowScreen(true);
		}, 50);
	}, [showScreen]);

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
				<VulnerabilityRisk
					vulnerabilityByRisk={companyData.issuesShare ?? {}}
					isLoading={isLoading}
				/>
				<VulnerabilitiesStatus
					vulnerabilityByShare={companyData.issuesCondition ?? {}}
				/>
			</section>
		</main>
	);
};

export default Dashboard;
