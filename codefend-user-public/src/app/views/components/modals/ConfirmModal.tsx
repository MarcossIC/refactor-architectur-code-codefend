import React, { useCallback, useState } from 'react';
import { ButtonLoader, Show } from '..';

interface ConfirmModalProps {
	close: () => void;
	action: () => void;

	header: string;
	confirmText: string;
	cancelText: string;
}

// million-ignore
const ConfirmModal = (props: ConfirmModalProps) => {
	const [isConfirm, setConfirm] = useState<boolean>(false);

	const handleSubmit = useCallback(
		(e: any) => {
			setConfirm(true);
			props.action();
		},
		[props.action],
	);
	const handleClose = useCallback(
		(e: any) => {
			props.close();
		},
		[props.close],
	);

	return (
		<div className="modal flex flex-col">
			<div className="pt-3 px-3 flex">
				<h4 className="text-small text-left font-bold title-format">
					{props.header}
				</h4>
			</div>
			<form>
				<div className="form-buttons">
					<button
						type="button"
						onClick={handleClose}
						disabled={isConfirm}
						className="log-inputs btn btn-secondary  btn-cancel codefend_secondary_ac">
						{props.cancelText}
					</button>
					<button
						type="button"
						disabled={isConfirm}
						onClick={handleSubmit}
						className="log-inputs btn btn-primary btn-add codefend_main_ac">
						<Show when={isConfirm}>
							<ButtonLoader />
						</Show>
						{props.confirmText}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ConfirmModal;
