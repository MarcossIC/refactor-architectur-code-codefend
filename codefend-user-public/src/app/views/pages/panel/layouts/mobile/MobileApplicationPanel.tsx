import React, { useEffect, useMemo, useState } from 'react';
import {
	PageLoader,
	EmptyScreenView,
	ModalTitleWrapper,
	AddMobileModal,
	AppCard,
} from '../../../../components';
import {
	MobileApp,
	generateIDArray,
	useMobile,
	useModal,
} from '../../../../../data';
import { MobileSelectedDetails } from './components/MobileSelectedDetails';

import './mobileApplicationPanel.scss';
import { useNavigate } from 'react-router';

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
	const { showModal, setShowModal, showModalStr, setShowModalStr } =
		useModal();

	const [showScreen, setShowScreen] = useState<boolean>(false);

	const mobileKeys = useMemo(() => {
		const mobileInfo = getMobileInfo();
		return mobileInfo ? generateIDArray(mobileInfo.length) : [];
	}, [getMobileInfo]);

	useEffect(() => {
		const timeoutId = setTimeout(() => setShowScreen(true), 50);
		return () => clearTimeout(timeoutId);
	}, [showScreen]);

	useEffect(() => {
		if (!isLoading && !isSelected && Boolean(getMobileInfo().length)) {
			selectMobile(getMobileInfo()[0]);
		}
	}, [getMobileInfo()]);

	const navigate = useNavigate();

	return (
		<>
			<ModalTitleWrapper
				isActive={showModal}
				headerTitle="ADD MOBILE APP"
				close={() => setShowModal(false)}>
				<AddMobileModal
					onDone={() => {
						refetch();
						setShowModal(false);
						setShowScreen(false);
						setTimeout(() => setShowScreen(true), 50);
					}}
					close={() => setShowModal(false)}
				/>
			</ModalTitleWrapper>
			<main className={`mobile ${showScreen ? 'actived' : ''}`}>
				{!isLoading ? (
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
										<button
											onClick={(e: React.FormEvent) => {
												setShowModal(true);
												setShowModalStr('add_mobile');
											}}
											className="btn btn-primary">
											ADD MOBILE APP
										</button>
									</div>

									<div className="list">
										{getMobileInfo().map(
											(mobile: MobileApp, index: number) => (
												<div
													key={mobileKeys[index]}
													className="app-info"
													onClick={() => selectMobile(mobile)}>
													<>
														<AppCard
															isActive={isCurrentMobileSelected(
																mobile.id,
															)}
															onDone={(id: string) => {
																setShowScreen(false);
																refetch();
																setTimeout(
																	() => setShowScreen(true),
																	50,
																);
																changeMobile(mobile);
															}}
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
											),
										)}
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
