import React, { Fragment, useContext, useMemo, useState } from 'react';
import {
	SupportProps,
	generateIDArray,
	supportTicket,
	useModal,
	useTicketDelete,
} from '../../../../../../data';
import {
	ConfirmModal,
	EmptyCard,
	MessageIcon,
	ModalTitleWrapper,
	PageLoader,
	Show,
	TrashIcon,
	AddTicketModal,
	TableV2,
} from '../../../../../components';
import SelectedTicket from '../supportProvider';

interface SupportTicketListProps {
	setSelectedTicket: (state: any) => void;
	isLoading: boolean;
	tickets: SupportProps[];
	refresh: () => void;
}

export const SupportTicketList: React.FC<SupportTicketListProps> = (props) => {
	const { showModal, showModalStr, setShowModal, setShowModalStr } =
		useModal();
	const [selectedID, setSelectedTicketIdToDelete] = useState<string>('');
	const selectedTicket = useContext(SelectedTicket);
	const { deletTicket } = useTicketDelete();
	const handleTicketSelection = (ticket: any) => {
		if (isSelected(ticket.id)) return;
		props.setSelectedTicket(ticket);
	};
	const isSelected = (id: string) => {
		return selectedTicket?.id === id;
	};

	const supportKeys = useMemo(() => {
		return props.tickets ? generateIDArray(props.tickets.length) : [];
	}, [props.tickets]);

	const handleDelete = () => {
		deletTicket(selectedID)?.then(() => {
			setShowModal(!showModal);
			props.refresh();
		});
	};
	const dataTable = props.tickets.reverse().map((ticket: SupportProps) => ({
		author: { value: '@' + ticket.userUsername, style: 'username' },
		published: { value: ticket.createdAt, style: 'date' },
		title: { value: ticket.csHeader, style: 'vul-title' },
		status: { value: ticket.condition, style: 'vul-condition' },
		action: { value: 'actions', style: 'id' },
	}));

	return (
		<>
			<ModalTitleWrapper
				headerTitle="Add ticket"
				isActive={showModal && showModalStr === 'add_ticket'}
				close={() => setShowModal(!showModal)}>
				<AddTicketModal
					close={() => setShowModal(!showModal)}
					onDone={() => {
						setShowModal(!showModal);
						props.refresh();
					}}
				/>
			</ModalTitleWrapper>

			<ModalTitleWrapper
				headerTitle="Delete ticket"
				isActive={showModal && showModalStr === 'delete_resource'}
				close={() => setShowModal(!showModal)}>
				<ConfirmModal
					header=""
					cancelText="Cancel"
					confirmText="Delete"
					close={() => setShowModal(!showModal)}
					action={() => handleDelete()}
				/>
			</ModalTitleWrapper>
			<div className="card">
				<div className="header">
					<div className="title">
						<div className="icon">
							<MessageIcon />
						</div>
						<span>Support Tickets</span>
					</div>
					<div className="actions">
						<div
							onClick={() => {
								setShowModal(!showModal);
								setShowModalStr('add_ticket');
							}}>
							Add Entry
						</div>
					</div>
				</div>
				<TableV2
					columns={supportTicket}
					rowsData={dataTable}
					showRows={!props.isLoading}
					showEmpty={!props.isLoading && dataTable.length === 0}
					sizeY={75}
					tableAction={{
						icon: <TrashIcon />,
						style: 'id',
						action: (id: string) => {
							setSelectedTicketIdToDelete(id);
							setShowModal(!showModal);
							setShowModalStr('delete_resource');
						},
					}}
				/>
			</div>
		</>
	);
};
