import React, { useEffect, useMemo, useState } from 'react';
import { PageLoader, EmptyScreenView } from '../../../../components';
import { AppCard } from '../../components/AppCard';
import { MobileApp, generateIDArray, useMobile } from '../../../../../data';
import { MobileSelectedDetails } from './components/MobileSelectedDetails';
import './mobileApplicationPanel.scss';
import '../../../../styles/card.scss';

const MobileApplicationPanel: React.FC = () => {
	const {
		isLoading,
		getMobileInfo,
		selectedMobileApp,
		isCurrentMobileSelected,
		refetch,
		isSelected,
		selectMobile,
		changeMobile,
	} = useMobile();

	const [showScreen, setShowScreen] = useState<boolean>(false);

	const mobileKeys = useMemo(() => {
		const mobileInfo = getMobileInfo();
		return mobileInfo ? generateIDArray(mobileInfo.length) : [];
	}, [getMobileInfo]);

	useEffect(() => {
		setTimeout(() => setShowScreen(true), 50);
	}, [showScreen]);

	useEffect(() => {
		if (!isLoading && !isSelected && Boolean(getMobileInfo().length)) {
			console.log('Entre ?');
			selectMobile(getMobileInfo()[0]);
		}
	}, [getMobileInfo()]);

	return (
		<>
			<main className={`mobile ${showScreen ? 'actived' : ''}`}>
				{!isLoading ? (
					<>
						{!Boolean(getMobileInfo().length) ? (
							<>
								<EmptyScreenView
									buttonText="Add Mobile"
									title={"There's no data to display here"}
									info={
										'Start by clicking on the button below'
									}
									event={() => {}}
								/>
							</>
						) : (
							<>
								<section className="left">
									<div className="add-button">
										<button
											onClick={(e: React.FormEvent) => {}}
											className="btn btn-primary">
											ADD MOBILE APP
										</button>
									</div>

									<div className="list">
										{getMobileInfo().map(
											(
												mobile: MobileApp,
												index: number,
											) => (
												<div
													key={mobileKeys[index]}
													className="mobile-info"
													onClick={() =>
														selectMobile(mobile)
													}>
													<>
														<AppCard
															isActive={isCurrentMobileSelected(
																mobile.id,
															)}
															onDone={(
																id: string,
															) => {
																refetch();
																changeMobile(
																	mobile,
																	id,
																);
															}}
															type={'mobile'}
															id={mobile.id}
															appMedia={
																mobile.appMedia
															}
															appDesc={
																mobile.appDesc
															}
															appReviews={
																mobile.appReviews
															}
															appRank={
																mobile.appRank
															}
															appDeveloper={
																mobile.appDeveloper
															}
															name={
																mobile.appName
															}
														/>
													</>
												</div>
											),
										)}
									</div>
								</section>

								<section className="right">
									{isSelected && (
										<>
											<MobileSelectedDetails
												selectedMobileApp={
													selectedMobileApp!
												}
											/>
										</>
									)}
								</section>
							</>
						)}
					</>
				) : (
					<>
						<PageLoader />
					</>
				)}
			</main>
		</>
	);
};

export default MobileApplicationPanel;
