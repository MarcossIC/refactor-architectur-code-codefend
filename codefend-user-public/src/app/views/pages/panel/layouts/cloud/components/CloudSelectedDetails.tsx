import React from 'react';
import {
	AppCardInfo,
	IssuesPanelMobileAndCloud,
	ProvidedTestingCredentials,
	VulnerabilitiesStatus,
	VulnerabilityRisk,
} from '../../../components';
import { CloudApp, useIssues } from '../../../../../../data';
import { PageLoader } from '../../../../../components';

interface CloudSelectedDetailsProrps {
	selectedCloudApp: CloudApp;
}

export const CloudSelectedDetails: React.FC<CloudSelectedDetailsProrps> = (
	props,
) => {
	const { getIssues, isLoading, refetchAll } = useIssues();

	return (
		<>
			{!isLoading ? (
				<>
					<div>
						<AppCardInfo selectedApp={props.selectedCloudApp} />
					</div>
					<div className="flex items-center my-4 gap-x-4">
						<div className=" ">
							<VulnerabilityRisk
								isLoading={isLoading}
								vulnerabilityByRisk={getIssues.issueShare ?? {}}
							/>
						</div>
						<div className="flex flex-col flex-grow">
							<ProvidedTestingCredentials
								isLoading={isLoading}
								credentials={[]}
							/>
							<VulnerabilitiesStatus
								vulnerabilityByShare={getIssues.issueCondition ?? {}}
							/>
						</div>
					</div>

					<section className="card table flex-grow ">
						<IssuesPanelMobileAndCloud
							isLoading={isLoading}
							issues={getIssues.issues}
							refetch={refetchAll}
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
