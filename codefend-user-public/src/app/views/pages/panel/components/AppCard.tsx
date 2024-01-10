import React from 'react';
import { defaultMobileCloudResourceAsset, useAppCard } from '../../../../data';
import { CloseIcon, ConfirmModal, ModalWrapper } from '../../../components';

interface MobileAppCardProps {
	isActive?: boolean;
	onDone?: (state: string) => void;
	isMainNetwork?: string | boolean;
	showDetails?: boolean;
	cloudProvider?: any;
	isMainGoogleNetwork?: string | boolean;
	isMobile?: string | boolean;
	type?: string;

	id: string;
	name: string;
	appMedia: string;
	appDesc: string;
	appReviews: string;
	appRank: string;
	appDeveloper: string;
}

export const AppCard: React.FC<MobileAppCardProps> = ({
	isActive,
	onDone,
	type,
	name,
	isMainNetwork,
	showDetails,
	cloudProvider,
	isMainGoogleNetwork,
	isMobile,

	id,
	appMedia,
	appDesc,
	appRank,
	appReviews,
	appDeveloper,
}) => {
	const {
		showModal,
		showModalStr,
		viewModal,
		isMobileType,
		isImage,
		isDetails,
		handleDelete,
	} = useAppCard({ type, name, isMainNetwork, showDetails, appMedia });

	return (
		<>
			{showModal && showModalStr === 'delete_confirmation' ? (
				<>
					<ModalWrapper
						action={() => {
							viewModal(false);
						}}>
						<div
							className="web-modal-wrapper internal-tables disable-border"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
							}}>
							<ConfirmModal
								header={`Are you sure you want to delete "${name}" ?`}
								cancelText="Cancel"
								confirmText="Delete"
								close={() => {
									viewModal(false);
								}}
								action={() => {
									handleDelete(id);
								}}
							/>
						</div>
					</ModalWrapper>
				</>
			) : (
				<></>
			)}
			<div
				className={`app-card ${
					isDetails || isMobile ? 'detail' : 'app-card-border'
				} ${isActive ? 'active' : ''}`}>
				{(isDetails || isMobileType) && (
					<button
						className="app-delete-btn"
						title={
							isMobileType ? 'Remove mobile app' : 'Remove cloud app'
						}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							viewModal(true);
						}}>
						<CloseIcon />
					</button>
				)}

				<div className="app-card-content">
					<div className="app-card-content-img">
						{isImage ? (
							<img
								src={`data:image/png;base64,${appMedia}`}
								alt="mobile-image"
							/>
						) : (
							<img
								src={
									defaultMobileCloudResourceAsset.includes(name)
										? `/codefend/${name}.jpg`
										: `/clouds/${
												isMobileType
													? 'android-ios.jpeg'
													: `${
															cloudProvider
																? `${cloudProvider}.png`
																: 'aws.png'
														}`
											}`
								}
								alt="mobile-image"
							/>
						)}
					</div>
					<div className="app-card-content-body">
						<div className="app-card-title">
							<h3 className={`${isDetails ?? 'text-red-500'}`}>
								{isMainGoogleNetwork ? 'main google network' : name}
							</h3>
							{isDetails && (
								<span className="second-text">resource id: {id}</span>
							)}
						</div>
						<div className="app-details text-gray">
							{isMainGoogleNetwork ? (
								<>
									<span>
										This is our main GCP network. Please handle with
										care.
									</span>
								</>
							) : (
								<>
									<p
										className={`app-details-description ${
											isMobileType ? 'isMobile' : 'notMobile'
										}`}>
										{appDesc ?? ''}
									</p>
									{isMobileType && (
										<>
											<span>{appDeveloper ?? ''}</span>
											<div className="reviews">
												<span>{appRank ?? ''}</span>
												{appReviews && <span>•</span>}
												<span>
													{' '}
													{appReviews
														? `${appReviews} reviews`
														: ''}
												</span>
												{isMobileType && (
													<div>
														<img
															src="/codefend/rank.svg"
															alt="star-icon"
														/>
													</div>
												)}
											</div>
										</>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
