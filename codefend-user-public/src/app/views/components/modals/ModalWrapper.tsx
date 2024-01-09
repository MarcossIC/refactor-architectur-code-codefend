import React, { ReactNode } from 'react';
import '../../styles/modal.scss';

interface ModalWrapper {
	children: ReactNode;
	isErrorBox?: boolean;
}

const ModalWrapper: React.FC<ModalWrapper> = ({
	isErrorBox = false,
	children,
}) => {
	return (
		<div
			onClick={(e) => {
				e;
			}}
			className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-20 z-20 py-10">
			<div className={`wrapper-content   ${!isErrorBox ? 'max-w' : ''}`}>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default ModalWrapper;
