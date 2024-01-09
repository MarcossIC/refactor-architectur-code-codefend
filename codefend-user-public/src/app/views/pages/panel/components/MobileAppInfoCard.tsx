import React from 'react';
import { MobileAppCard } from './MobileAppCard';
import '../../../styles/card.scss';

interface MobileAppInfoCardProps {
	type: string;
	selectedApp: any;
}

export const MobileAppInfoCard: React.FC<MobileAppInfoCardProps> = ({
	type,
	selectedApp,
}) => {
	const isMobileType = type == 'mobile';
	const buttonText = isMobileType
		? ' request pentest'
		: ' request automated scan';
	const appName = isMobileType ? 'app_name' : 'cloud_name';

	return (
		<div className={`mobile-info-card ${!isMobileType ? 'notMobile' : ''}`}>
			<div className={`${!isMobileType ? 'isMobile' : ''}`}>
				<MobileAppCard
					name={selectedApp[appName]}
					appDesc={
						isMobileType ? undefined : selectedApp['cloud_desc']
					}
					{...selectedApp}
					showDetails={isMobileType ? false : true}
					isMobile={isMobileType}
				/>
			</div>

			<button
				onClick={(e) => {
					alert('Procesing your order');
				}}
				className="btn btn-primary">
				{buttonText}
			</button>
		</div>
	);
};
