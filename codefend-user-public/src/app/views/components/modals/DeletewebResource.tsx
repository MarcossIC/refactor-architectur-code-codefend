import React, { useState } from 'react';
import { ButtonLoader } from '../';
import { toast } from 'react-toastify';
import { WebApplicationService } from '../../../data';
import '../../styles/modal.scss';

interface DeleteResource {
	onDelete?: () => void;
	onDone?: () => void;
	id?: string | number;
	isDeleting: boolean;
}

export const DeletewebResource: React.FC<DeleteResource> = (props) => {
	const [isDeletingResource, setIsDeletingResource] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (props.onDelete && props.onDelete !== undefined) {
			props.onDelete();
			return;
		}
		setIsDeletingResource(true);

		WebApplicationService.deleteResource(props?.id as string)
			.then(() => {
				if (props.onDone && props.onDone !== undefined) props.onDone();
				toast.success('Successfully Deleted Web Resource...');
			})
			.finally(() => setIsDeletingResource(false));
	};

	return (
		<div className="modal delete-webr">
			<form onSubmit={handleSubmit}>
				<div className="form-buttons">
					<button
						type="button"
						disabled={isDeletingResource}
						className="log-inputs btn-cancel codefend_secondary_ac">
						Cancel
					</button>
					<button
						type="submit"
						disabled={isDeletingResource}
						className="log-inputs btn-add codefend_main_ac">
						{(props.isDeleting || isDeletingResource) && (
							<ButtonLoader />
						)}
						Delete
					</button>
				</div>
			</form>
		</div>
	);
};
