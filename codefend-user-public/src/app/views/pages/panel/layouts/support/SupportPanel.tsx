import React, { useEffect, useState } from 'react';
import { SupportChatDisplay } from './components/SupportChatDisplay';
import { SupportTicketList } from './components/SupportTicketList';
import { useAllTicket } from '../../../../../data';
import './support.scss';

const SupportPanel: React.FC = () => {
	const [showScreen, setShowScreen] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
	const { getTikets, isLoading, refetch } = useAllTicket();

	useEffect(() => {
		if (selectedTicket === null && !isLoading && Boolean(getTikets.length)) {
			const _data = getTikets();
			selectedTicket(_data);
		}
	}, []);

	useEffect(() => {
		refetch();
		const timeoutId = setTimeout(() => setShowScreen(true), 50);
		return () => clearTimeout(timeoutId);
	}, [refresh]);

	return (
		<>
			<main className={`support ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<SupportTicketList
						setSelectedTicket={setSelectedTicket}
						selectedTicket={selectedTicket}
						isLoading={isLoading}
						tickets={[]}
						refetch={() => {
							setRefresh(!refetch);
						}}
					/>
				</section>
				<section className="right">
					{selectedTicket && (
						<SupportChatDisplay selectedTicket={selectedTicket} />
					)}
				</section>
			</main>
		</>
	);
};

export default SupportPanel;
