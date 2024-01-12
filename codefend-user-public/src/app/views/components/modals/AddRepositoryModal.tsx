import React, { useState } from 'react';
import { ButtonLoader, GlobeWebIcon } from '..';
import { toast } from 'react-toastify';

interface AddRepositoryModalProps {
	onDone: (params: any) => void;
	close: () => void;
}
interface RepositoryModel {
	repositoryName: string;
	repositoryUrl: string;
	sourceCode: string;
	visibility: string;

	isLoading: boolean;
}

export const AddRepositoryModal: React.FC<AddRepositoryModalProps> = (
	props,
) => {
	const [sourceCodeForm, setSourceCode] = useState<RepositoryModel>({
		repositoryName: '',
		repositoryUrl: '',
		sourceCode: '',
		visibility: '',

		isLoading: false,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSourceCode((current) => ({ ...current, isLoading: true }));
		const { repositoryName, repositoryUrl, sourceCode, visibility } =
			sourceCodeForm;
		if (
			!repositoryName ||
			repositoryName.length == 0 ||
			repositoryName.length > 150
		) {
			toast.error('Invalid name');
			setSourceCode((current) => ({ ...current, isLoading: false }));
			return;
		}

		if (
			!repositoryUrl ||
			repositoryUrl.length == 0 ||
			repositoryUrl.length > 150
		) {
			toast.error('Invalid url');
			setSourceCode((current) => ({ ...current, isLoading: false }));
			return;
		}

		if (!sourceCode || sourceCode.length == 0 || sourceCode.length > 30) {
			toast.error('Invalid language');
			setSourceCode((current) => ({ ...current, isLoading: false }));
			return;
		}

		const requestParams = {
			name: repositoryName,
			access_link: repositoryUrl,
			source_code: sourceCode,
			is_public: visibility === 'public' ? 'yes' : 'no',
		};
		console.log({ requestParams });
		props.onDone(requestParams);
	};

	return (
		<>
			<div className="modal text-format">
				<form className="flex flex-col gap-y-3">
					<div className="form-input text">
						<span className="form-icon">
							<div className="codefend-text-red">
								<GlobeWebIcon />
							</div>
						</span>

						<input
							type="text"
							onChange={(e) =>
								setSourceCode((current: RepositoryModel) => ({
									...current,
									repositoryName: e.target.value,
								}))
							}
							placeholder="repository name"
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
							onChange={(e) =>
								setSourceCode((current: RepositoryModel) => ({
									...current,
									repositoryUrl: e.target.value,
								}))
							}
							placeholder="repository url"
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
							onChange={(e) =>
								setSourceCode((current: RepositoryModel) => ({
									...current,
									sourceCode: e.target.value,
								}))
							}
							placeholder="source code language"
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
							onChange={(e) =>
								setSourceCode((current: RepositoryModel) => ({
									...current,
									visibility: e.target.value,
								}))
							}
							className="log-inputs modal_info"
							value={sourceCodeForm.visibility}
							required>
							<option value="" disabled>
								visibility
							</option>
							<option value="public">public</option>
							<option value="private">private</option>
						</select>
					</div>

					<div className="form-buttons">
						<button
							disabled={sourceCodeForm.isLoading}
							type="button"
							onClick={() => props.close()}
							className="log-inputs codefend_secondary_ac btn btn-secondary btn-cancel">
							Cancel
						</button>
						<button
							type="submit"
							disabled={sourceCodeForm.isLoading}
							onClick={handleSubmit}
							className="log-inputs codefend_main_ac btn btn-primary btn-add">
							{sourceCodeForm.isLoading && <ButtonLoader />}
							Add repository
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
