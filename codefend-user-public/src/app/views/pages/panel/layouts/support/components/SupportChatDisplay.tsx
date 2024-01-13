import React, { Fragment, useCallback, useEffect, useMemo } from 'react';
import {
	ChatBoxType,
	generateIDArray,
	useOneTicket,
} from '../../../../../../data';
import {
	ChatBox,
	MessageCard,
	MessageIcon,
	PageLoader,
} from '../../../../../components';

interface SupportChatDisplayProps {
	selectedTicket: any;
}

export const SupportChatDisplay: React.FC<SupportChatDisplayProps> = (
	props,
) => {
	const { getOneTicket, isLoading, refetch } = useOneTicket();

	useEffect(() => refetch(props.selectedTicket.id), []);

	const selectedTicket = () => props.selectedTicket ?? { csHeader: '' };
	const childTicket = useCallback(() => getOneTicket().childs ?? [], []);

	const ticketKeys = useMemo(() => {
		return childTicket() ? generateIDArray(childTicket().length) : [];
	}, [childTicket]);

	return (
		<>
			<div className="card messages">
				<div className="header">
					<div className="title">
						<div className="icon">
							<MessageIcon />
						</div>
						<span>{selectedTicket().csHeader}</span>
					</div>
				</div>
				<div className="content">
					{!isLoading ? (
						<>
							<div
								className={`messages-wrapper ${
									getOneTicket()?.childs?.length > 3 && 'item'
								}`}>
								<MessageCard
									selectedID={selectedTicket()?.id ?? ''}
									body={selectedTicket().body ?? {}}
									username={selectedTicket()?.username ?? ''}
									createdAt={selectedTicket()?.createdAt ?? ''}
								/>

								{childTicket().map((ticket: any, i: number) => {
									<Fragment key={ticketKeys[i]}>
										<MessageCard
											selectedID={ticket?.id ?? ''}
											body={ticket.body ?? {}}
											username={ticket?.username ?? ''}
											createdAt={ticket?.createdAt ?? ''}
										/>
									</Fragment>;
								})}
							</div>
						</>
					) : (
						<>
							<PageLoader />
						</>
					)}
				</div>
				<ChatBox
					type={ChatBoxType.SUPPORT}
					onDone={() => refetch(selectedTicket()?.id)}
					selectedID={selectedTicket()?.id}
				/>
			</div>
		</>
	);
};
