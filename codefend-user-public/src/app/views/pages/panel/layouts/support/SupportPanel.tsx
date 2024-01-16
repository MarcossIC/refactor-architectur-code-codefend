import React, { useEffect, useState } from 'react';
import { SupportChatDisplay } from './components/SupportChatDisplay';
import { SupportTicketList } from './components/SupportTicketList';
import { SupportProps, useAllTicket } from '../../../../../data';
import { Show } from '../../../../components';
import './support.scss';
import SelectedTicket from './supportProvider';

const SupportPanel: React.FC = () => {
	const [showScreen, setShowScreen] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState<SupportProps | null>(
		null,
	);
	const { getTikets, isLoading, refetch } = useAllTicket();

	useEffect(() => {
		if (
			selectedTicket === null &&
			!isLoading &&
			Boolean(getTikets().length)
		) {
			const _data = getTikets();
			setSelectedTicket(_data[0]!);
		}
	}, [getTikets(), isLoading]);

	useEffect(() => {
		refetch();
		const timeoutId = setTimeout(() => setShowScreen(true), 50);
		return () => clearTimeout(timeoutId);
	}, [refresh]);

	return (
		<SelectedTicket.Provider value={selectedTicket}>
			<main className={`support ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<SupportTicketList
						setSelectedTicket={(ticket: SupportProps) =>
							setSelectedTicket(ticket)
						}
						isLoading={isLoading}
						tickets={getTikets() ?? []}
						refetch={() => {
							setRefresh(!refetch);
						}}
					/>
				</section>
				<section className="right">
					<Show when={selectedTicket !== null}>
						<SupportChatDisplay />
					</Show>
				</section>
			</main>
		</SelectedTicket.Provider>
	);
};

export default SupportPanel;
