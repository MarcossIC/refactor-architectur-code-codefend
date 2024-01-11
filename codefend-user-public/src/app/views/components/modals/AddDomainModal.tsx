import React, { useState } from 'react';

import { GlobeWebIcon, ButtonLoader } from '../';
import { toast } from 'react-toastify';
import { useAuthState, User, WebApplicationService } from '../../../data';

interface AddDomainProps {
	onDone: () => void;
	close?: () => void;
}

const AddDomainModal: React.FC<AddDomainProps> = (props) => {
	const [domainName, setDomainName] = useState('');
	const [subdomainDetection, setSubdomainDetection] = useState<boolean>(true);
	const [isAddingDomain, setIsAddingDomain] = useState<boolean>(false);

	const { getUserdata } = useAuthState();

	const handleChange = (e: React.ChangeEvent) => {
		console.log(subdomainDetection);
		setSubdomainDetection(!subdomainDetection);
		console.log(subdomainDetection);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsAddingDomain(true);
		console.log({ domainName });
		if (!domainName) return;

		if (!domainName || domainName.length === 0 || domainName.length > 100) {
			toast.error('Invalid domain');
			setIsAddingDomain(false);
			return;
		}
		const user = getUserdata() as User;
		const companyID = user?.companyID as string;

		WebApplicationService.addResource(domainName, companyID)
			.then(({ response }) => {
				if (response !== 'success') {
					throw new Error('An error has occurred on the server');
				}

				setDomainName('');
				props.onDone();
				toast.success('Successfully Added Domain..');
			})
			.catch((error: any) => {
				toast.error(error.message);
				props.close?.();
			})
			.finally(() => setIsAddingDomain(false));
		return;
	};

	return (
		<div className="modal admin-modal text-format">
			<form>
				<div className="form-input-text">
					<span className="form-icon">
						<div className="codefend-text-red">
							<GlobeWebIcon />
						</div>
					</span>
					<input
						type="text"
						className="log-inputs"
						placeholder="domain name"
						onChange={(e) => setDomainName(e.target.value)}
						required
					/>
				</div>

				<div className="form-input-checkbox ">
					<input
						type="checkbox"
						name="resourceDomainNetwork"
						className="codefend-checkbox"
					/>

					<label className="modal_info">
						Automatic subdomain detection
					</label>
				</div>

				<div className="form-buttons">
					<button
						type="button"
						disabled={isAddingDomain}
						onClick={() => props.close?.()}
						className="log-inputs codefend_secondary_ac btn btn-secondary btn-cancel">
						Cancel
					</button>

					<button
						type="submit"
						disabled={isAddingDomain}
						onClick={handleSubmit}
						className="log-inputs codefend_main_ac btn btn-primary btn-add">
						{isAddingDomain && <ButtonLoader />}
						Add web resource
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddDomainModal;
