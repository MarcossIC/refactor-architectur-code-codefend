import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PageLoader, EmptyScreenView } from '../../../components';
import '../../../shared/card.scss';
import { MobileAppCard } from '../components/MobileAppCard';
import { generateIDArray, useMobile } from '../../../../data';

interface MobileApp {
	id: string;
}

const MobileApplicationPanel: React.FC = () => {
	const [showScreen, setShowScreen] = useState<boolean>(false);
	const [selectedMobileApp, setSelectedMobileApp] = useState<MobileApp>(
		{} as MobileApp,
	);

	const { isLoading, mobileInfo } = useMobile();

	const getMobileInfo = () => {
		const mobileData = isLoading ? [] : mobileInfo.disponibles;
		const mobileDataGroup = mobileData ?? [];
		return mobileDataGroup;
	};

	const handleMobileAppClick = useCallback(
		(mobile: any) => {
			if (mobile.id === selectedMobileApp.id) return;

			setSelectedMobileApp(mobile);
		},
		[setSelectedMobileApp],
	);

	const handleActiveMobileValidation = useCallback(
		(mobile: any) => {
			return mobile.id === selectedMobileApp.id;
		},
		[selectedMobileApp],
	);

	const mobileKeys = useMemo(
		() => generateIDArray(mobileInfo.length),
		[mobileInfo.length],
	);

	useEffect(() => {
		setTimeout(() => setShowScreen(true), 50);
	}, []);

	useEffect(() => {
		if (selectedMobileApp === null) {
			const mobileData = getMobileInfo();
			if (!isLoading && Boolean(mobileData.length))
				setSelectedMobileApp(mobileData[0]);
		}
	}, [selectedMobileApp]);

	return (
		<>
			<main className={`mobile ${showScreen ? 'actived' : ''}`}>
				{!isLoading ? (
					<>
						{!Boolean(mobileInfo.length) ? (
							<>
								<EmptyScreenView
									buttonText="Add Mobile"
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
										{mobileInfo.map(
											(info: any, index: number) => (
												<div
													key={mobileKeys[index]}
													className="mobile-info"
													onClick={() =>
														handleMobileAppClick(
															info,
														)
													}>
													<>
														<MobileAppCard
															active={handleActiveMobileValidation(
																info,
															)}
															onDone={(
																id: any,
															) => {
																if (
																	selectedMobileApp &&
																	selectedMobileApp.id ===
																		id
																) {
																	setSelectedMobileApp(
																		{} as MobileApp,
																	);
																}
															}}
															type={'mobile'}
															{...info}
															name={info.app_name}
														/>
													</>
												</div>
											),
										)}
									</div>
								</section>

								<section className="right">
									{selectedMobileApp && <></>}
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
