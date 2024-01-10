import React, { useEffect, useMemo, useState } from 'react';
import {
	AddCloudModal,
	EmptyScreenView,
	ModalTitleWrapper,
	PageLoader,
} from '../../../../components';
import {
	CloudApp,
	generateIDArray,
	useCloud,
	useModal,
} from '../../../../../data';
import { AppCard } from '../../components';
import { CloudSelectedDetails } from './components/CloudSelectedDetails';

const CloudApplicationPanel: React.FC = () => {
	const [showScreen, setShowScreen] = useState<boolean>(false);
	const {
		changeSelected,
		selectedCloud,
		isActive,
		getCloudData,
		isLoading,
		refetch,
	} = useCloud();

	const { setShowModal, setShowModalStr, showModal, showModalStr } =
		useModal();

	useEffect(() => {
		setTimeout(() => setShowScreen(true), 50);
	}, [showScreen]);

	const cloudKeys = useMemo(() => {
		const mobileInfo = getCloudData();
		return mobileInfo ? generateIDArray(mobileInfo.length) : [];
	}, [getCloudData]);

	useEffect(() => {
		if (!isLoading && !selectedCloud && Boolean(getCloudData().length)) {
			changeSelected(getCloudData()[0]);
		}
	}, [getCloudData()]);

	return (
		<>
			<ModalTitleWrapper
				isActive={showModal && showModalStr === 'add_cloud'}
				headerTitle="Add Cloud"
				close={() => setShowModal(false)}>
				<AddCloudModal
					close={() => setShowModal(false)}
					onDone={() => {
						setShowModal(false);
						setShowScreen(false);
						refetch();
						setTimeout(() => setShowScreen(true), 50);
					}}
				/>
			</ModalTitleWrapper>
			<main className={`mobile cloud ${showScreen ? 'actived' : ''}`}>
				{!isLoading ? (
					<>
						{!Boolean(getCloudData().length) ? (
							<EmptyScreenView
								buttonText="Add Cloud"
								title={"There's no data to display here"}
								info={'Start by clicking on the button below'}
								event={() => {}}
							/>
						) : (
							<>
								<section className="left">
									<div className="add-button">
										<button
											onClick={(e: React.FormEvent) => {
												setShowModal(true);
												setShowModalStr('add_cloud');
											}}
											className="btn btn-primary">
											ADD CLOUD
										</button>
									</div>

									<div className="list">
										{getCloudData().map(
											(app: CloudApp, index: number) => (
												<div
													className="app-info"
													key={cloudKeys[index]}
													onClick={() => {
														changeSelected(app);
													}}>
													<AppCard
														isActive={isActive(app.id)}
														onDone={(id: string) => {
															setShowScreen(false);
															refetch();
															setTimeout(
																() => setShowScreen(true),
																50,
															);

															if (
																selectedCloud &&
																isActive(id)
															) {
																changeSelected(null);
															}
														}}
														id={app.id}
														type="cloud"
														name={app.appName}
														appMedia={app.appMedia}
														appDesc={app.appDesc}
														cloudProvider={app.cloudProvider}
													/>
												</div>
											),
										)}
									</div>
								</section>
								<section className="right">
									{selectedCloud ? (
										<>
											<CloudSelectedDetails
												selectedCloudApp={selectedCloud}
											/>
										</>
									) : (
										<></>
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

export default CloudApplicationPanel;
