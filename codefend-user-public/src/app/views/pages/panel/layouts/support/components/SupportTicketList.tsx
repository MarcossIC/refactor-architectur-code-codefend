import React, { Fragment, useContext, useMemo, useState } from 'react';
import {
	SupportProps,
	generateIDArray,
	useModal,
	useTicketDelete,
} from '../../../../../../data';
import {
	AddTicketModal,
	ConfirmModal,
	EmptyCard,
	MessageIcon,
	ModalTitleWrapper,
	PageLoader,
	Show,
	TrashIcon,
} from '../../../../../components';
import SelectedTicket from '../supportProvider';
import { toast } from 'react-toastify';

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

	const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
		if (e) {
			e.preventDefault();
		}
		deletTicket(selectedID)?.then(() => {
			toast.success('Successfully deleted')
			setShowModal(!showModal);
			props.refresh();
		});
	};

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
					action={(e) => handleDelete(e)}
				/>
			</ModalTitleWrapper>
			<div className="card table">
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

				<div className="columns-name">
					<div className="username">author</div>
					<div className="date">published</div>
					<div className="vul-title">title</div>
					<div className="status">status</div>
					<div className="id">actions</div>
				</div>
				<Show when={!props.isLoading} fallback={<PageLoader />}>
					<div className="rows">
						{props.tickets
							.reverse()
							.map((ticket: SupportProps, i: number) => (
								<Fragment key={supportKeys[i]}>
									<div
										onClick={() => handleTicketSelection(ticket)}
										className={`item ${
											isSelected(ticket.id) && 'left-marked'
										}`}>
										<div className="username">
											@{ticket.userUsername}
										</div>
										<div className="date">{ticket.createdAt}</div>
										<div className="vul-title">{ticket.csHeader}</div>
										<div
											className={`status ${
												ticket.condition === 'open' &&
												'codefend-text-red'
											}`}>
											{ticket.condition}
										</div>

										<div
											className="trash"
											onClick={() => {
												setSelectedTicketIdToDelete(ticket.id);
												setShowModal(!showModal);
												setShowModalStr('delete_resource');
											}}>
											<TrashIcon />
										</div>
									</div>
								</Fragment>
							))}
					</div>
				</Show>
			</div>
			<Show when={!props.isLoading && props.tickets.length === 0}>
				<EmptyCard />
			</Show>
		</>
	);
};
