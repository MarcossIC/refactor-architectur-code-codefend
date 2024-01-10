import React, { useState } from 'react';
import { ButtonLoader } from '..';
import { toast } from 'react-toastify';
import { User, WebApplicationService, useAuthState } from '../../../data';

interface DeleteResource {
	onDelete?: () => void;
	onDone?: () => void;
	close?: () => void;
	isDeleting?: boolean;
	id: string | null;
}

export const DeletewebResource: React.FC<DeleteResource> = ({
	id,
	close,
	onDone,
	onDelete,
}) => {
	const [isDeletingResource, setIsDeletingResource] = useState<boolean>(false);
	const { getUserdata } = useAuthState();
	const handleSubmit = (e: any) => {
		e.preventDefault();
		setIsDeletingResource(true);

		if (onDelete && onDelete !== undefined) {
			onDelete();
			return;
		}
		const user = getUserdata() as User;

		WebApplicationService.deleteResource(id!, user.companyID)
			.then(({ response }) => {
				if (response !== 'success')
					throw new Error('An error has occurred on the server');

				toast.success('Successfully Deleted Web Resource...');
				if (onDone && onDone !== undefined) onDone();
			})
			.catch((error: any) => {
				toast.error(error.message);
				close?.();
			})
			.finally(() => setIsDeletingResource(false));
	};

	return (
		<div className="modal delete-webr">
			<form>
				<div className="form-buttons">
					<button
						type="button"
						onClick={() => close?.()}
						disabled={isDeletingResource}
						className="log-inputs btn btn-secondary  btn-cancel codefend_secondary_ac">
						Cancel
					</button>
					<button
						type="button"
						disabled={isDeletingResource}
						onClick={handleSubmit}
						className="log-inputs btn btn-primary btn-add codefend_main_ac">
						{isDeletingResource && <ButtonLoader />}
						Delete
					</button>
				</div>
			</form>
		</div>
	);
};
