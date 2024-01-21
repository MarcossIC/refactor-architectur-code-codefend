import React, { useState } from 'react';

import {
	GlobeWebIcon,
	ButtonLoader,
	SecondaryButton,
	Show,
	PrimaryButton,
} from '../';
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
		setSubdomainDetection(!subdomainDetection);
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
					<SecondaryButton
						text="Cancel"
						click={(e: React.FormEvent) => props.close?.()}
						isDisabled={isAddingDomain}
						className="btn-cancel codefend_secondary_ac"
					/>
					<PrimaryButton
						text="Add web resource"
						click={handleSubmit}
						isDisabled={isAddingDomain}
						className="btn-add codefend_main_ac"
					/>
				</div>
			</form>
		</div>
	);
};

export default AddDomainModal;
