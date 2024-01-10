import React, { useState } from 'react';
import { MobileService, useModal } from '../../../data';
import { toast } from 'react-toastify';
import { ButtonLoader, GlobeWebIcon } from '..';

interface Props {
	onDone: () => void;
}

export const AddMobileModal: React.FC<Props> = (props) => {
	const { showModal, setShowModal, showModalStr, setShowModalStr } =
		useModal();
	const [appName, setAppName] = useState('');
	const [androidAddress, setAndroidAddress] = useState('');
	const [iosAddress, setIosAddress] = useState('');
	const [isAddingMobile, setIsAddingMobile] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
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

		MobileService.add(androidAddress, iosAddress)
			.then(() => {
				props.onDone();
				setShowModal(!showModal);
				toast.success('Successfully Added Mobile App...');
			})
			.finally(() => {
				setIsAddingMobile(false);
			});
	};

	return (
		<>
			<div className="container flex items-center justify-center  mx-auto p-3 text-format">
				<form onSubmit={handleSubmit} className="p-6">
					<div className="relative flex items-center mt-4 w-96">
						<span className="absolute">
							<span className="codefend-text-red">
								<GlobeWebIcon />
							</span>
						</span>

						<input
							type="text"
							onChange={(e) => {
								setAndroidAddress(e.target.value);
							}}
							className="block w-full py-3 bg-white border px-11 log-inputs  focus:outline-none dark:text-gray-300"
							placeholder="android download link"
						/>
					</div>
					<div className="relative flex items-center mt-4 w-96">
						<span className="absolute">
							<span className="codefend-text-red">
								<GlobeWebIcon />
							</span>
						</span>

						<input
							type="text"
							onChange={(e) => {
								setIosAddress(e.target.value);
							}}
							className="block w-full py-3 bg-white border px-11 log-inputs  focus:outline-none dark:text-gray-300"
							placeholder="ios download link"
						/>
					</div>
					<div className="mt-6 flex">
						<button
							type="button"
							disabled={isAddingMobile}
							onClick={() => {
								setShowModal(!showModal);
							}}
							className="log-inputs text-gray focus:outline-none w-2/6 px-4 mr-2 py-3 text-sm tracking-wide text-white transition-colors duration-300">
							cancel
						</button>
						<button
							type="submit"
							disabled={isAddingMobile}
							className="log-inputs flex flex-row items-center gap-x-2 text-white focus:outline-none bg-codefend px-6 w-4/6 py-3 text-sm tracking-wide text-white transition-colors duration-300 codefend_main_ac">
							{isAddingMobile && <ButtonLoader />}
							add mobile app
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
