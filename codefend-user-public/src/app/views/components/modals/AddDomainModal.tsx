import React, { useState } from 'react';

import { GlobeWebIcon, ButtonLoader } from '../';
import { toast } from 'react-toastify';
import '../../shared/modal.scss';
import { useAuthState, WebApplicationService } from '../../../data';

interface AddDomainProps {
	onDone: () => void;
}

const AddDomainModal: React.FC<AddDomainProps> = (props) => {
	const [domainName, setDomainName] = useState('');
	const [subdomainDetection, setSubdomainDetection] = useState(false);
	const [isAddingDomain, setIsAddingDomain] = useState(false);

	const { getUserdata } = useAuthState();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsAddingDomain(true);
		if (!domainName) return;

		if (!domainName || domainName.length == 0 || domainName.length > 100) {
			toast.error('Invalid domain');
			return setIsAddingDomain(false);
		}
		const companyID = getUserdata()?.companyID as string;

		return WebApplicationService.addResource(domainName, companyID)
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
						onClick={() =>
							setSubdomainDetection(!subdomainDetection)
						}
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
						className="log-inputs codefend_secondary_ac btn-cancel">
						cancel
					</button>

					<button
						type="button"
						disabled={isAddingDomain}
						className="log-inputs codefend_main_ac btn-add bg-codefend">
						{isAddingDomain && <ButtonLoader />}
						add web resource
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddDomainModal;
