import React, { useCallback, useState } from 'react';
import { MobileService, useAuthState, useModal } from '../../../data';
import { toast } from 'react-toastify';
import { ButtonLoader, GlobeWebIcon } from '..';

interface Props {
	onDone: () => void;
	close: () => void;
}

export const AddMobileModal: React.FC<Props> = (props) => {
	const [appName, setAppName] = useState('');
	const [androidAddress, setAndroidAddress] = useState('');
	const [iosAddress, setIosAddress] = useState('');
	const [isAddingMobile, setIsAddingMobile] = useState(false);
	const { getUserdata } = useAuthState();

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			setIsAddingMobile(true);

			if (androidAddress.length > 150) {
				toast.error('Invalid android address');
				setIsAddingMobile(false);
				return;
			}

			if (iosAddress.length > 150) {
				toast.error('Invalid ios address');
				setIsAddingMobile(false);
				return;
			}

			if (!androidAddress && !iosAddress) {
				toast.error('Kindly fill in field(s)');
				setIsAddingMobile(false);
				return;
			}
			MobileService.add(androidAddress, iosAddress, getUserdata()?.companyID)
				.then((response) => {
					if (!response)
						throw new Error('An error has occurred on the server');

					props.onDone();
					props.close();
					toast.success('Successfully Added Mobile App...');
				})
				.catch((error: any) => {
					toast.error(error.message);
					props.close();
				})
				.finally(() => {
					setIsAddingMobile(false);
				});
		},
		[androidAddress, iosAddress],
	);

	return (
		<>
			<div className="modal flex items-center justify-center p-3 text-format">
				<form className="flex flex-col gap-y-3">
					<div className="form-input text">
						<span className="form-icon">
							<div className="codefend-text-red">
								<GlobeWebIcon />
							</div>
						</span>

						<input
							type="text"
							onChange={(e) => {
								setAndroidAddress(e.target.value);
							}}
							placeholder="android download link"
						/>
					</div>

					<div className="form-input text">
						<span className="form-icon">
							<div className="codefend-text-red">
								<GlobeWebIcon />
							</div>
						</span>

						<input
							type="text"
							onChange={(e) => {
								setIosAddress(e.target.value);
							}}
							placeholder="ios download link"
						/>
					</div>
					<div className="form-buttons">
						<button
							type="button"
							disabled={isAddingMobile}
							onClick={() => {
								props.close();
							}}
							className="log-inputs btn btn-secondary  btn-cancel codefend_secondary_ac">
							Cancel
						</button>
						<button
							type="submit"
							disabled={isAddingMobile}
							onClick={handleSubmit}
							className="log-inputs btn btn-primary btn-add codefend_main_ac">
							{isAddingMobile && <ButtonLoader />}
							Add mobile app
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
