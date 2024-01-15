import { useAuthState } from '../../../data';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ButtonLoader, GlobeWebIcon, SecondaryButton } from '..';
import { CloudService } from '../../../data';

interface Props {
	onDone: () => void;
	close: () => void;
}

export const AddCloudModal: React.FC<Props> = (props) => {
	const [appName, setAppName] = useState('');
	const [provider, setProvider] = useState('');
	const [description, setDescription] = useState('');
	const [isAddingMobile, setIsAddingMobile] = useState(false);
	const { getUserdata } = useAuthState();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setIsAddingMobile(true);

		if (!appName || appName.length == 0 || appName.length > 150) {
			toast.error('Invalid app name');
			setIsAddingMobile(false);
			return;
		}

		const requestParams = {
			llave_1: '',
			llave_2: '',
			llave_3: '',
			provider: provider,
			name: appName,
			desc: description,
		};
		const company = getUserdata()?.companyID as string;

		CloudService.add(requestParams, company)
			.then(() => {
				props.onDone();
				toast.success('Successfully Added Cloud...');
			})
			.finally(() => {
				setIsAddingMobile(false);
			});
	};

	return (
		<>
			<div className="modal text-format">
				<form className="flex flex-col gap-y-3">
					<div className="form-input">
						<span className="form-icon">
							<div className="codefend-text-red">
								<GlobeWebIcon />
							</div>
						</span>

						<select
							onChange={(e) => {
								setProvider(e.target.value);
							}}
							className="log-inputs modal_info"
							value={provider}
							id="select-provider-cloud"
							required>
							<option value="" disabled selected>
								Provider
							</option>
							<option value="azure">Azure</option>
							<option value="aws">AWS</option>
							<option value="google">Google</option>
						</select>
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
								setAppName(e.target.value);
							}}
							placeholder="name"
							required
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
								setDescription(e.target.value);
							}}
							placeholder="description"
							required
						/>
					</div>
					<div className="form-buttons">
						<SecondaryButton
							text={'Cancel'}
							click={(e: React.FormEvent) => props.close?.()}
							isDisabled={isAddingMobile}
						/>
						<button
							type="submit"
							disabled={isAddingMobile}
							onClick={handleSubmit}
							className="log-inputs codefend_main_ac btn btn-primary btn-add">
							{isAddingMobile && <ButtonLoader />}
							Add cloud
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
