import React, { useMemo } from 'react';
import { AppCard } from './AppCard';
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
		<div
			className={`app-card-wrapper app-card-border ${
				!isMobileType ? 'notMobile' : ''
			}`}>
			<div className={`${isMobileType ? 'app-card-isMobile' : ''}`}>
				<AppCard
					showDetails={isMobileType ? false : true}
					isMobile={isMobileType}
					id={selectedApp.id}
					appMedia={selectedApp.appMedia}
					appDesc={selectedApp.appDesc}
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
