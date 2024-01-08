import React, { useState } from 'react';
import { ButtonLoader, GlobeWebIcon } from '../';
import { toast } from 'react-toastify';
import '../../shared/modal.scss';
import {
	WebApplicationService,
	Webresources,
	useAuthState,
} from '../../../data';

interface SubdomainModalP {
	onDone: () => void;
	webResources?: any;
}

const AddSubDomainModal: React.FC<SubdomainModalP> = (props) => {
	const [mainDomainId, setMainDomainId] = useState('');
	const [domainName, setDomainName] = useState('');
	const [ipAddress, setIpAddress] = useState('');
	const [isAddingSubDomain, setIsAddingSubDomain] = useState(false);
	const { getUserdata } = useAuthState();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!mainDomainId || mainDomainId.length == 0) {
			return toast.error('Invalid main resource');
		}

		if (!domainName || domainName.length == 0 || domainName.length > 100) {
			return toast.error('Invalid domain');
		}

		setIsAddingSubDomain(true);

		const companyID = getUserdata()?.companyID as string;

		WebApplicationService.addSubresource(
			mainDomainId,
			domainName,
			companyID,
		)
			.then((res) => {
				setDomainName('');
				props.onDone();
				toast.success('Successfully Added Domain..');
			})
			.finally(() => setIsAddingSubDomain(false));
	};

	return (
		<div className="modal subdomain-modal">
			<form onClick={handleSubmit}>
				<div className="form-input">
					<span className="form-icon">
						<GlobeWebIcon />
					</span>

					<select
						onChange={(e) => setMainDomainId(e.target.value)}
						value={mainDomainId}
						className="log-inputs modal_info"
						name="Main resource"
						id="select-subdomain-resources"
						required>
						<option value="" disabled>
							main resource
						</option>
						{props.webResources.map((resource: Webresources) => (
							<option key={resource.id} value={resource.id}>
								{resource.resourceDomain}
							</option>
						))}
					</select>
				</div>

				<div className="form-input text">
					<span className="form-icon codefend-text-red">
						<GlobeWebIcon />
					</span>
					<input
						type="text"
						onChange={(e) => setDomainName(e.target.value)}
						placeholder="domain name"
						required
					/>
				</div>

				<div className="form-input text">
					<span className="form-icon codefend-text-red">
						<GlobeWebIcon />
					</span>
					<input
						type="text"
						onChange={(e) => setIpAddress(e.target.value)}
						placeholder="IP address"
						disabled
					/>
				</div>

				<div className="form-buttons">
					<button
						type="button"
						disabled={isAddingSubDomain}
						className="log-inputs btn-cancel codefend_secondary_ac">
						Cancel
					</button>

					<button
						type="submit"
						disabled={isAddingSubDomain}
						className="log-inputs btn-add codefend_main_ac">
						{isAddingSubDomain && <ButtonLoader />}
						Add web resource
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddSubDomainModal;
