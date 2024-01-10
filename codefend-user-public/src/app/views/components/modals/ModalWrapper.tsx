import React, { ReactNode } from 'react';

interface ModalWrapper {
	children: ReactNode;
	isErrorBox?: boolean;
	action?: () => void;
}

const ModalWrapper: React.FC<ModalWrapper> = ({
	isErrorBox = false,
	children,
	action,
}) => {
	return (
		<div
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				action && action();
			}}
			className="modal-wrapper">
			<div className={`wrapper-content ${!isErrorBox ? 'max-w' : ''}`}>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default ModalWrapper;
