import { useModal } from 'app/data';
import {
	ConfirmModal,
	EmptyCard,
	MessageIcon,
	ModalTitleWrapper,
	PageLoader,
	TrashIcon,
} from '../../../../../components';
import React, { Fragment, useState } from 'react';

interface SupportTicketListProps {
	setSelectedTicket: any;
	selectedTicket: any;
	isLoading: boolean;
	tickets: any;
	refetch: any;
}

export const SupportTicketList: React.FC<SupportTicketListProps> = (props) => {
	const { showModal, showModalStr, setShowModal, setShowModalStr } =
		useModal();
	const [selectedTicketIdToDelete, setSelectedTicketIdToDelete] =
		useState(null);

	const handleTicketSelection = (ticket: any) => {
		if (props.selectedTicket()?.id === ticket.id) return;
		props.setSelectedTicket(ticket);
	};
	const isSelected = (id: string) => {
		return props.selectedTicket()?.id === id;
	};
	return (
		<>
			<ModalTitleWrapper
				headerTitle="Add ticket"
				isActive={showModal && showModalStr === 'add_ticket'}
				close={() => setShowModal(!showModal)}>
				<ConfirmModal
					header=""
					cancelText="Cancel"
					confirmText="Delete"
					close={() => setShowModal(!showModal)}
					action={() => {}}
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
					action={() => {}}
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
								setShowModalStr('add_mobile_app');
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
				{!props.isLoading ? (
					<div className="rows">
						{props.tickets.reverse().map((ticket: any, index: number) => (
							<Fragment key={index}>
								<div
									onClick={() => handleTicketSelection(ticket)}
									className={`item ${
										isSelected(ticket.id) && 'left-marked'
									}`}>
									<div className="username">
										@{ticket.userUsername}
									</div>
									<div className="date">{ticket.createdAt}</div>
									<div className="vul-title">{ticket.headerCS}</div>
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
											setSelectedTicketIdToDelete(ticket);
											setShowModal(!showModal);
											setShowModalStr('delete_resource');
										}}>
										<TrashIcon />
									</div>
								</div>
							</Fragment>
						))}
					</div>
				) : (
					<>
						<PageLoader />
					</>
				)}
			</div>

			{!(!props.isLoading && props.tickets.length === 0) ?? <EmptyCard />}
		</>
	);
};
