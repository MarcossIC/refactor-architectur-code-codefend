import React, { ReactNode } from 'react';
import { ModalWrapper, StatIcon } from '..';

interface ModalTitleWrapperProps {
	children: ReactNode;
	headerTitle: string;
	isActive: boolean;
	close: () => void;
}

const ModalTitleWrapper: React.FC<ModalTitleWrapperProps> = ({
	children,
	headerTitle,
	isActive,
	close,
}) => {
	return (
		<>
			{isActive ? (
				<>
					<ModalWrapper action={close}>
						<div
							className="modal-wrapper-title internal-tables disable-border"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
							}}>
							<div className="modal-header">
								<div className="icon">
									<StatIcon />
								</div>
								{headerTitle}
							</div>
							{children}
							<div className="modal-helper-box text-format"></div>
						</div>
					</ModalWrapper>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default ModalTitleWrapper;
