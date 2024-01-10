import React, { useMemo } from 'react';
import { AppCard } from './AppCard';
import '../../../styles/card.scss';
import { MobileApp } from 'app/data';

interface MobileAppInfoCardProps {
	type: string;
	selectedApp: MobileApp | any;
}

export const MobileAppInfoCard: React.FC<MobileAppInfoCardProps> = ({
	type,
	selectedApp,
}) => {
	const isMobileType = useMemo(() => type === 'mobile', [type]);
	const buttonText = useMemo(
		() => (isMobileType ? ' Request pentest' : ' Request automated scan'),
		[isMobileType],
	);

	return (
		<div className={`mobile-info-card ${!isMobileType ? 'notMobile' : ''}`}>
			<div className={`${!isMobileType ? 'isMobile' : ''}`}>
				<AppCard
					showDetails={isMobileType ? false : true}
					isMobile={isMobileType}
					id={selectedApp.id}
					appMedia={selectedApp.appMedia}
					appDesc={
						isMobileType ? undefined : selectedApp['cloud_desc']
					}
					appReviews={selectedApp.appReviews}
					appRank={selectedApp.appRank}
					appDeveloper={selectedApp.appDeveloper}
					name={selectedApp.appName}
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
