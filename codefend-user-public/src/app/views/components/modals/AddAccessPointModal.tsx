import { useAuthState, useModal } from '../../../data';
import { LanApplicationService } from '../../../data/services/lan.service';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ButtonLoader, GlobeWebIcon } from '..';

interface NetworkData {
	domainName: string;
	vendorName: string;
	username: string;
	password: string;
	internalAddress: string;
	externalAddress: string;
	isAddingInternalNetwork: boolean;
}

export const AcessPointModal: React.FC<{
	onDone: () => void;
	close: () => void;
}> = (props) => {
	const { getUserdata } = useAuthState();
	const companyID = getUserdata()?.companyID;

	const [networkData, setNetworkData] = useState<NetworkData>({
		domainName: '',
		vendorName: '',
		username: '',
		password: '',
		internalAddress: '',
		externalAddress: '',
		isAddingInternalNetwork: false,
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setNetworkData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const { showModal, setShowModal } = useModal();

	const {
		domainName,
		vendorName,
		username,
		password,
		internalAddress,
		externalAddress,
		isAddingInternalNetwork,
	} = networkData;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setNetworkData((prevData) => ({
			...prevData,
			isAddingInternalNetwork: true,
		}));

		if (!domainName || domainName.length == 0) {
			toast.error('Invalid host name');
			return setNetworkData((prevData) => ({
				...prevData,
				isAddingInternalNetwork: false,
			}));
		}

		if (!vendorName) {
			toast.error('Invalid vendor name');
			return setNetworkData((prevData) => ({
				...prevData,
				isAddingInternalNetwork: false,
			}));
		}

		if (!username || username.length == 0) {
			toast.error('Invalid username');
			return setNetworkData((prevData) => ({
				...prevData,
				isAddingInternalNetwork: false,
			}));
		}

		if (!password || password.length == 0) {
			toast.error('Invalid password');
			return setNetworkData((prevData) => ({
				...prevData,
				isAddingInternalNetwork: false,
			}));
		}

		const requestParams = {
			device_name: networkData.domainName,
			device_version: networkData.vendorName,
			access_username: networkData.username,
			access_password: networkData.password,
			device_in_address: networkData.internalAddress,
			device_ex_address: networkData.externalAddress,
		};

		LanApplicationService.add(requestParams, companyID)
			.then(() => {
				props.onDone();
				setShowModal(!showModal);
				toast.success('successfully added Access Point...');
			})
			.finally(() => {
				setNetworkData((prevData) => ({
					...prevData,
					isAddingInternalNetwork: false,
				}));
			});
	};

	return (
		<>
			<div className="modal flex items-center justify-center p-3 text-format">
				<form className="flex flex-col gap-y-3">
					<div className="form-input">
						<span className="form-icon">
							<div className="codefend-text-red">
								<GlobeWebIcon />
							</div>
						</span>
						<select
							onChange={handleChange}
							className="log-inputs modal_info"
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
					<div className="form-input">
						<span className="form-icon">
							<div className="codefend-text-red">
								<GlobeWebIcon />
							</div>
						</span>

						<input
							type="text"
							onChange={handleChange}
							placeholder="hostname"
							required
						/>
					</div>
					<div className="form-input">
						<span className="form-icon">
							<div className="codefend-text-red">
								<GlobeWebIcon />
							</div>
						</span>

						<input
							type="text"
							onChange={handleChange}
							placeholder="Internal IP Address"
							required
						/>
					</div>
					<div className="form-input">
						<span className="form-icon">
							<div className="codefend-text-red">
								<GlobeWebIcon />
							</div>
						</span>

						<input
							type="text"
							onChange={handleChange}
							placeholder="External IP Address"
							required
						/>
					</div>

					<div className="form-input">
						<span className="form-icon">
							<div className="codefend-text-red">
								<GlobeWebIcon />
							</div>
						</span>

						<input
							type="text"
							onChange={handleChange}
							placeholder="username"
							required
						/>
					</div>
					<div className="form-input">
						<span className="form-icon">
							<div className="codefend-text-red">
								<GlobeWebIcon />
							</div>
						</span>

						<input
							type="password"
							onChange={handleChange}
							placeholder="password"
							required
						/>
					</div>
					<div className="form-buttons">
						<button
							type="button"
							onClick={() => {
								props.close();
							}}
							className="log-inputs btn btn-secondary  btn-cancel codefend_secondary_ac">
							cancel
						</button>
						<button
							type="submit"
							onClick={handleSubmit}
							className="log-inputs btn btn-primary btn-add codefend_main_ac">
							{isAddingInternalNetwork && <ButtonLoader />}
							add access point
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default AcessPointModal;
