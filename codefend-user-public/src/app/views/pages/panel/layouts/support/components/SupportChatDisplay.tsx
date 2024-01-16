import React, { Fragment, useContext, useEffect, useMemo } from 'react';
import {
	ChatBoxType,
	SupportProps,
	generateIDArray,
	useOneTicket,
} from '../../../../../../data';
import {
	ChatBox,
	MessageCard,
	MessageIcon,
	PageLoader,
	Show,
	SimpleSection,
} from '../../../../../components';
import SelectedTicket from '../supportProvider';

interface SupportChatDisplayProps {}

export const SupportChatDisplay: React.FC<SupportChatDisplayProps> = () => {
	const { getOneTicket, isLoading, refetch } = useOneTicket();
	const selectedTicket = useContext(SelectedTicket);

	useEffect(() => {
		if (selectedTicket) {
			refetch(selectedTicket.id);
		}
	}, [selectedTicket]);

	const ticketSelected = () =>
		'csHeader' in selectedTicket!
			? selectedTicket
			: ({ csHeader: '' } as SupportProps);

	const childTicket = (): SupportProps[] => getOneTicket()?.childs ?? [];

	const ticketKeys = useMemo(() => {
		return childTicket() ? generateIDArray(childTicket().length) : [];
	}, [childTicket]);

	return (
		<>
			<div className="card messages">
				<SimpleSection
					header={ticketSelected().csHeader}
					icon={<MessageIcon />}>
					<div className="content">
						<Show when={!isLoading} fallback={<PageLoader />}>
							<>
								<div
									className={`messages-wrapper ${
										childTicket().length > 3 && 'item'
									}`}>
									<MessageCard
										selectedID={ticketSelected().csHeader ?? ''}
										body={ticketSelected()?.csBody! ?? {}}
										username={ticketSelected()?.userUsername! ?? ''}
										createdAt={ticketSelected()?.createdAt! ?? ''}
									/>

									{childTicket().map(
										(ticket: SupportProps, i: number) => (
											<Fragment key={ticketKeys[i]}>
												<MessageCard
													selectedID={ticket.userID ?? ''}
													body={ticket.csBody ?? ''}
													username={ticket.userUsername ?? ''}
													createdAt={ticket.createdAt ?? ''}
												/>
											</Fragment>
										),
									)}
								</div>
							</>
						</Show>
					</div>
				</SimpleSection>

				<ChatBox
					type={ChatBoxType.SUPPORT}
					onDone={() => refetch(ticketSelected().id!)}
					selectedID={ticketSelected().id!}
				/>
			</div>
		</>
	);
};
