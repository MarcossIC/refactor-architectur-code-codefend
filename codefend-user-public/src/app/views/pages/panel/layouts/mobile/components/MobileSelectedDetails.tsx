import React, { useCallback } from 'react';
import {
	AppCardInfo,
	ProvidedTestingCredentials,
	VulnerabilityRisk,
	VulnerabilitiesStatus,
	IssuesPanelMobileAndCloud,
	PageLoader,
} from '../../../../../components';
import {
	Issues,
	IssuesCondition,
	IssuesShare,
	MobileApp,
	useMobileOne,
} from '../../../../../../data';

interface MobileSelectedDetailsProps {
	selectedMobileApp: MobileApp;
}

export const MobileSelectedDetails: React.FC<MobileSelectedDetailsProps> = ({
	selectedMobileApp,
}) => {
	const getSelectedMobileAppId = useCallback(
		() => (selectedMobileApp ? selectedMobileApp.id : ''),
		[],
	);
	const { isLoding, getMobile, refetch } = useMobileOne(
		getSelectedMobileAppId(),
	);

	return (
		<>
			{!isLoding ? (
				<>
					<div>
						<AppCardInfo type="mobile" selectedApp={selectedMobileApp} />
					</div>
					<div className="provided-testing-container">
						<div className="wrapper">
							<ProvidedTestingCredentials
								credentials={getMobile().creds ?? []}
								isLoading={isLoding}
							/>
						</div>
						<div className="dashboard-charts">
							<VulnerabilityRisk
								isLoading={isLoding}
								vulnerabilityByRisk={
									getMobile().issueShare
										? getMobile().issueShare
										: ({} as IssuesShare)
								}
							/>
							<VulnerabilitiesStatus
								vulnerabilityByShare={
									getMobile().issueCondition ?? ({} as IssuesCondition)
								}
							/>
						</div>
					</div>

					<section className="card table">
						<IssuesPanelMobileAndCloud
							isLoading={isLoding}
							issues={getMobile().issues ?? ({} as Issues)}
						/>
					</section>
				</>
			) : (
				<>
					<PageLoader />
				</>
			)}
		</>
	);
};
