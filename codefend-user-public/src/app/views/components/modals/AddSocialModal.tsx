import { useAuthState } from '../../../data';
import { SocialAplicationService } from '../../../data/services/social.service';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ButtonLoader, GlobeWebIcon, SecondaryButton, Show } from '..';

interface SocialData {
	fName: string;
	lName: string;
	mail: string;
	phone: string;
	role: string;
	isAddingMember: boolean;
}

interface Props {
	onDone: () => void;
	close: () => void;
}

export const MobileAppModal: React.FC<Props> = (props) => {
	const { getUserdata } = useAuthState();
	const companyID = getUserdata()?.companyID;
	const [socialData, setSocialData] = useState<SocialData>({
		fName: '',
		lName: '',
		mail: '',
		phone: '',
		role: '',

		isAddingMember: false,
	});
	const { fName, isAddingMember, lName, mail, phone, role } = socialData;

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setSocialData((prevData) => ({ ...prevData, isAddingMember: true }));

		if (!fName || fName.length == 0 || fName.length > 40) {
			toast.error('Invalid name');
			return setSocialData((prevData) => ({
				...prevData,
				isAddingMember: false,
			}));
		}

		if (!lName || lName.length == 0 || lName.length > 40) {
			toast.error('Invalid name');
			return setSocialData((prevData) => ({
				...prevData,
				isAddingMember: false,
			}));
		}

		let regexMail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,10}$/;
		if (!mail || mail.length === 0 || !regexMail.test(mail)) {
			toast.error('Invalid email');
			setSocialData((prevData) => ({
				...prevData,
				isAddingMember: false,
			}));
			return;
		}

		if (!phone || phone.length == 0 || phone.length > 20) {
			toast.error('Invalid phone');
			setSocialData((prevData) => ({
				...prevData,
				isAddingMember: false,
			}));
			return;
		}

		if (!role) {
			toast.error('Invalid role');

			setSocialData((prevData) => ({
				...prevData,
				isAddingMember: false,
			}));
			return;
		}

		const requestParams = {
			member_fname: fName,
			member_lname: lName,
			member_email: mail,
			member_phone: phone,
			member_role: role,
		};

		SocialAplicationService.add(requestParams, companyID!)
			.then(() => {
				props.onDone();
				toast.success('Successfully Added Member...');
			})
			.finally(() => {
				setSocialData((prevData) => ({
					...prevData,
					isAddingMember: false,
				}));
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

						<input
							type="text"
							onChange={(e) => {
								setSocialData((prevData) => ({
									...prevData,
									fName: e.target.value,
								}));
							}}
							placeholder="first name"
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
							onChange={(e) => {
								setSocialData((prevData) => ({
									...prevData,
									lName: e.target.value,
								}));
							}}
							placeholder="last name"
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
							onChange={(e) => {
								setSocialData((prevData) => ({
									...prevData,
									mail: e.target.value,
								}));
							}}
							placeholder="email address"
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
							onChange={(e) => {
								setSocialData((prevData) => ({
									...prevData,
									phone: e.target.value,
								}));
							}}
							placeholder="phone number"
							required
						/>
					</div>
					<div className="form-input">
						<span className="form-icon">
							<div className="codefend-text-red">
								<GlobeWebIcon />
							</div>
						</span>
						<select
							onChange={(e) => {
								setSocialData((prevData) => ({
									...prevData,
									role: e.target.value,
								}));
							}}
							id="social-data"
							className="log-inputs modal_info"
							value={socialData.role}
							required>
							<option value="" disabled>
								role
							</option>
							<option value="admin">administrative</option>
							<option value="human">human resources</option>
							<option value="info">information tech</option>
							<option value="ads">marketing</option>
							<option value="sales">sales</option>
							<option value="finance">finance</option>
							<option value="cs">customer service</option>
							<option value="prod">production & ops</option>
							<option value="plan">strategy & planning</option>
						</select>
					</div>
					<div className="form-buttons">
						<SecondaryButton
							isDisabled={isAddingMember}
							text="Cancel"
							click={() => props.close()}
						/>
						<button
							type="submit"
							disabled={isAddingMember}
							onClick={handleSubmit}
							className="log-inputs codefend_main_ac btn btn-primary btn-add">
							<Show when={isAddingMember}>
								<ButtonLoader />
							</Show>
							Add repository
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default MobileAppModal;
