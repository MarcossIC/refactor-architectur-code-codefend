import React, { useEffect, useMemo } from 'react';
import { MobileSelectedDetails } from '../..';
import { AppCard, EmptyScreenView } from '../../../../../components';
import { MobileApp, generateIDArray, useMobile } from '../../../../../../data';

interface MobileApplicationProps {
	openModal: () => void;
	refresh: () => void;
}

export const MobileApplication: React.FC<MobileApplicationProps> = ({
	openModal,
	refresh,
}) => {
	const {
		getMobileInfo,
		selectedMobileApp,
		isCurrentMobileSelected,
		changeMobile,
		isSelected,
		refetch,
		selectMobile,
	} = useMobile();

	const mobileKeys = useMemo(() => {
		const mobileInfo = getMobileInfo();
		return mobileInfo ? generateIDArray(mobileInfo.length) : [];
	}, [getMobileInfo]);

	useEffect(() => refetch(), []);
	useEffect(() => {
		if (!isSelected && Boolean(getMobileInfo().length)) {
			selectMobile(getMobileInfo()[0]);
		}
	}, [getMobileInfo()]);

	return (
		<>
			{!Boolean(getMobileInfo().length) ? (
				<>
					<EmptyScreenView
						buttonText="Add Mobile"
						title={"There's no data to display here"}
						info={'Start by clicking on the button below'}
						event={() => {}}
					/>
				</>
			) : (
				<>
					<section className="left">
						<div className="add-button">
							<button onClick={openModal} className="btn btn-primary">
								ADD MOBILE APP
							</button>
						</div>

						<div className="list">
							{getMobileInfo().map((mobile: MobileApp, i: number) => (
								<div
									key={mobileKeys[i]}
									className="app-info"
									onClick={() => selectMobile(mobile)}>
									<>
										<AppCard
											isActive={isCurrentMobileSelected(mobile.id)}
											onDone={(id: string) => refresh()}
											type={'mobile'}
											id={mobile.id}
											appMedia={mobile.appMedia}
											appDesc={mobile.appDesc}
											appReviews={mobile.appReviews}
											appRank={mobile.appRank}
											appDeveloper={mobile.appDeveloper}
											name={mobile.appName}
										/>
									</>
								</div>
							))}
						</div>
					</section>

					<section className="right">
						{isSelected && (
							<>
								<MobileSelectedDetails
									selectedMobileApp={selectedMobileApp!}
								/>
							</>
						)}
					</section>
				</>
			)}
		</>
	);
};
