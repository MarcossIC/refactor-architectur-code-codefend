import { MessageIcon } from '../../../../../components';
import React from 'react';

interface SupportChatDisplayProps {
	selectedTicket: any;
}

export const SupportChatDisplay: React.FC<SupportChatDisplayProps> = (
	props,
) => {
	return (
		<>
			<div className="card messages">
				<div className="header">
					<div className="title">
						<div className="icon">
							<MessageIcon />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
