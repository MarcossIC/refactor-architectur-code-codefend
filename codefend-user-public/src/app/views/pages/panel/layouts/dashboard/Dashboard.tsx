import React, { ChangeEvent, useEffect, useState } from 'react';

import DashboardSearchbar from './components/DashboardSearchbar';
import DashboardCollaborators from './components/DashboardCollaborators';
import DashboardAssets from './components/DashboardAssets';
import DashboardVulnerabilities from './components/DashboardVulnerabilities';

import { IssuesShare, useDashboard } from '../../../../../data';
import {
	VulnerabilityRisk,
	VulnerabilitiesStatus,
	SearchBar,
	SearchIcon,
} from '../../../../components';
import '../../../../styles/flag.scss';
import './dashboard.scss';
import { useNavigate } from 'react-router';

const Dashboard = () => {
	const { isLoading, companyData } = useDashboard();
	const [showScreen, setShowScreen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [searchClass, setSearchClass] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const timeoutId = setTimeout(() => setShowScreen(true), 50);
		return () => clearTimeout(timeoutId);
	}, [showScreen]);
	const getSearchClass = () => searchClass;
	const selectBarOptions = {
		options: { email: 'email', password: 'password', name: 'full name' },
		placeHolder: 'chose a class',
		value: getSearchClass(),
		change: (e: ChangeEvent<HTMLSelectElement>) =>
			setSearchClass(e.target.value),
	};

	return (
		<main className={`dashboard ${showScreen ? 'actived' : ''}`}>
			<section className="left">
				<SearchBar
					placeHolder="Sns"
					isActiveSelect
					selectOptions={selectBarOptions}
					handleSubmit={() =>
						navigate(
							'/sns?search=' + searchValue + '&class=' + searchClass,
						)
					}
					handleChange={(e: any) => setSearchValue(e.target.value)}
					inputValue={searchValue}
					searchIcon={<SearchIcon isButton />}
				/>
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
					vulnerabilityByRisk={
						companyData.issuesShare ?? ({} as IssuesShare)
					}
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
