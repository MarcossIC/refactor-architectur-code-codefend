import { useAppSelector, useModal } from '../../../data';
import { LanApplicationService } from '../../../data/services/lan.service';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ButtonLoader, GlobeWebIcon } from '..';

interface NetworkDeviceModalProps {
	internalNetwork: {
		id: number;
		device_name: string;
		device_ex_address: string;
	}[];
}

export const AddNetworkDeviceModal: React.FC<NetworkDeviceModalProps> = (
	props,
) => {
	const [formData, setFormData] = useState({
		domainName: '',
		vendorName: '',
		mainDomainId: 0,
		internalIpAddress: '',
		externalIpAddress: '',
		isAddingInternalNetwork: false,
	});

	const companyID = useAppSelector(
		(state) => state.authState.userData?.companyID,
	);

	const navigate = useNavigate();
	const { showModal, setShowModal } = useModal();

	const {
		mainDomainId,
		domainName,
		vendorName,
		internalIpAddress,
		externalIpAddress,
		isAddingInternalNetwork,
	} = formData;

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (!mainDomainId || mainDomainId == 0) {
			return toast.error('Invalid main resource');
		}

		if (!domainName || domainName.length == 0) {
			return toast.error('Invalid host name');
		}

		const requestBody = {
			device_name: domainName,
			//device_vendor: vendorName(),
			device_os: vendorName,
			device_in_address: internalIpAddress,
			device_ex_address: externalIpAddress,
			resource_lan_dad: mainDomainId,
		};

		LanApplicationService.add(requestBody, companyID)
			.then(() => {
				toast.success('successfully added Sub Network...');
			})
			.finally(() => {
				setShowModal(!showModal);
				navigate(0);
			});

		return;
	};

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	return (
		<>
			<div className="container flex items-center justify-center  mx-auto p-3 text-format">
				<form onSubmit={handleSubmit} className="p-6">
					<div className="relative flex items-center w-96">
						<span className="absolute">
							{/* <FaSolidGlobe className="w-3 h-3 mx-4 codefend-text-red" /> */}
							<GlobeWebIcon />
						</span>

						<select
							onChange={handleOnChange}
							className="block w-full py-3 bg-white border px-11 log-inputs focus:outline-none dark:text-gray-300 modal_info"
							required>
							<option value="" disabled selected>
								main resource
							</option>
							{props.internalNetwork.map((resource: any) => (
								<option
									key={resource.id}
									value={
										resource.id
									}>{`${resource.device_name} - ${resource.device_ex_address}`}</option>
							))}
						</select>
					</div>
					<div className="relative flex items-center w-96 mt-4">
						<span className="absolute">
							<GlobeWebIcon />
						</span>

						<select
							onChange={handleOnChange}
							className="block w-full py-3 bg-white border px-11 log-inputs focus:outline-none dark:text-gray-300 modal_info"
							required>
							<option value="" disabled selected>
								os / vendor
							</option>
							<option value="windows">windows</option>
							<option value="linux">linux</option>
							<option value="unknown">unknown</option>
							<option value="android">android</option>
							<option value="ios">ios</option>
						</select>
					</div>
					<div className="relative flex items-center w-96 mt-4">
						<span className="absolute">
							<GlobeWebIcon />
						</span>

						<input
							type="text"
							onChange={handleOnChange}
							className="block w-full py-3 bg-white border px-11 log-inputs focus:outline-none dark:text-gray-300"
							placeholder="hostname"
							required
						/>
					</div>

					<div className="relative flex items-center mt-4 w-96">
						<span className="absolute">
							<GlobeWebIcon />
						</span>

						<input
							type="text"
							onChange={handleOnChange}
							className="block w-full py-3 bg-white border px-11 log-inputs  focus:outline-none dark:text-gray-300"
							placeholder="internal IP"
							required
						/>
					</div>
					<div className="relative flex items-center mt-4 w-96">
						<span className="absolute">
							<GlobeWebIcon />
						</span>

						<input
							type="text"
							onChange={handleOnChange}
							className="block w-full py-3 bg-white border px-11 log-inputs  focus:outline-none dark:text-gray-300"
							placeholder="external IP"></input>
					</div>
					<div className="mt-6  flex">
						<button
							type="button"
							onClick={() => {
								setShowModal(!showModal);
							}}
							className="log-inputs text-gray focus:outline-none w-2/6 px-4 mr-2 py-3 text-sm tracking-wide text-white transition-colors duration-300 codefend_secondary_ac">
							cancel
						</button>
						<button
							type="submit"
							className="log-inputs flex flex-row items-center gap-x-2 text-white focus:outline-none bg-codefend px-6 w-4/6 py-3 text-sm tracking-wide text-white transition-colors duration-300 codefend_main_ac">
							{isAddingInternalNetwork && <ButtonLoader />}
							add access point
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
