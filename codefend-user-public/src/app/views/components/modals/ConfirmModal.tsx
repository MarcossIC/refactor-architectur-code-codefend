import React, { useCallback, useState } from 'react';
import { ButtonLoader, PrimaryButton, SecondaryButton, Show } from '..';

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
					<SecondaryButton
						text={props.cancelText}
						click={handleClose}
						isDisabled={isConfirm}
						className="btn-cancel codefend_secondary_ac"
					/>
					<PrimaryButton
						text={props.confirmText}
						click={handleSubmit}
						isDisabled={isConfirm}
						className="btn-add codefend_main_ac"
					/>
				</div>
			</form>
		</div>
	);
};

export default ConfirmModal;
