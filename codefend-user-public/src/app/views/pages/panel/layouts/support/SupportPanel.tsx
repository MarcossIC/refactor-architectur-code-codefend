import { EmptyScreenView } from '../../../../components';
import React, { useEffect, useState } from 'react';
import { SupportChatDisplay } from './components/SupportChatDisplay';
import { SupportTicketList } from './components/SupportTicketList';

interface Props {}

const SupportPanel: React.FC<Props> = (props) => {
	const [showScreen, setShowScreen] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState(null);

	useEffect(() => {
		const timeoutId = setTimeout(() => setShowScreen(true), 50);
		return () => clearTimeout(timeoutId);
	}, [showScreen]);

	return (
		<>
			<main className={`support ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<SupportTicketList
						setSelectedTicket={setSelectedTicket}
						selectedTicket={selectedTicket}
						isLoading={false}
						tickets={{}}
						refetch={() => {}}
					/>
				</section>
				<section className="right">
					{selectedTicket && <SupportChatDisplay selectedTicket={{}} />}
				</section>
			</main>
		</>
	);
};

export default SupportPanel;
