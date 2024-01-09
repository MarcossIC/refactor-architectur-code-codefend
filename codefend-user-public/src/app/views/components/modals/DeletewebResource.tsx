import React, { useState } from 'react';
import { ButtonLoader } from '../';
import { toast } from 'react-toastify';
import { User, WebApplicationService, useAuthState } from '../../../data';
import '../../styles/modal.scss';

interface DeleteResource {
	onDelete?: () => void;
	onDone?: () => void;
	close?: () => void;
	id?: string | number;
}

export const DeletewebResource: React.FC<DeleteResource> = (props) => {
	const [isDeletingResource, setIsDeletingResource] = useState(false);
	const { getUserdata } = useAuthState();
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (props.onDelete && props.onDelete !== undefined) {
			props.onDelete();
			return;
		}
		setIsDeletingResource(true);
		const user = getUserdata() as User;
		WebApplicationService.deleteResource(
			props?.id as string,
			user.companyID,
		)
			.then(({ res }) => {
				if (res !== 'success')
					throw new Error('An error has occurred on the server');

				toast.success('Successfully Deleted Web Resource...');
				if (props.onDone && props.onDone !== undefined) props.onDone();
			})
			.catch((error: any) => {
				toast.error(error.message);
				props.close?.();
			})
			.finally(() => setIsDeletingResource(false));
	};

	return (
		<div className="modal delete-webr">
			<form onSubmit={handleSubmit}>
				<div className="form-buttons">
					<button
						type="button"
						onClick={() => props.close?.()}
						disabled={isDeletingResource}
						className="log-inputs btn btn-cancel codefend_secondary_ac">
						Cancel
					</button>
					<button
						type="submit"
						disabled={isDeletingResource}
						className="log-inputs btn btn-add codefend_main_ac">
						{isDeletingResource && <ButtonLoader />}
						Delete
					</button>
				</div>
			</form>
		</div>
	);
};
