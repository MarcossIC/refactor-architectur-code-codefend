import React, { useState } from 'react';

import { GlobeWebIcon, ButtonLoader } from '../';
import { toast } from 'react-toastify';
import { useAuthState, User, WebApplicationService } from '../../../data';
import '../../styles/modal.scss';

interface AddDomainProps {
	onDone: () => void;
	close?: () => void;
}

const AddDomainModal: React.FC<AddDomainProps> = (props) => {
	const [domainName, setDomainName] = useState('');
	const [subdomainDetection, setSubdomainDetection] = useState(true);
	const [isAddingDomain, setIsAddingDomain] = useState(false);

	const { getUserdata } = useAuthState();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsAddingDomain(true);
		if (!domainName) return;

		if (!domainName || domainName.length == 0 || domainName.length > 100) {
			toast.error('Invalid domain');
			setIsAddingDomain(false);
			return;
		}
		const user = getUserdata() as User;
		const companyID = user?.companyID as string;

		WebApplicationService.addResource(domainName, companyID)
			.then((res) => {
				setDomainName('');
				props.onDone();
				toast.success('Successfully Added Domain..');
			})
			.finally(() => setIsAddingDomain(false));
	};

	return (
		<div className="modal admin-modal text-format">
			<form onSubmit={handleSubmit}>
				<div className="form-input-text">
					<input
						autoFocus
						type="text"
						className="log-inputs"
						placeholder="domain name"
						onChange={(e) => setDomainName(e.target.value)}
						required
					/>
					<span className="form-icon">
						<div className="codefend-text-red">
							<GlobeWebIcon />
						</div>
					</span>
				</div>

				<div className="form-input-checkbox ">
					<input
						type="checkbox"
						onChange={(e) => {
							setSubdomainDetection(e.target.checked);
						}}
						name="link-checkbox"
						id="link-checkbox"
						checked={subdomainDetection}
						className="codefend-text-red checkbox-color"
						required
					/>

					<label htmlFor="link-checkbox" className="modal_info">
						Automatic subdomain detection
					</label>
				</div>

				<div className="form-buttons">
					<button
						type="button"
						disabled={isAddingDomain}
						onClick={() => props.close?.()}
						className="log-inputs codefend_secondary_ac btn btn-secondary btn-cancel">
						cancel
					</button>

					<button
						type="submit"
						disabled={isAddingDomain}
						className="log-inputs codefend_main_ac btn btn-primary btn-add">
						{isAddingDomain && <ButtonLoader />}
						add web resource
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddDomainModal;
