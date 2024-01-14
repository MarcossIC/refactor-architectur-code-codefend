import React, { useEffect, useState } from 'react';
import { EmptyScreenView } from '../../../../components';
import { InxSearchAndData } from './components/InxSearchAndData';
import { InxPreviousSearches } from './components/InxPreviousSearches';

export const InxPanel: React.FC = () => {
	const [showScreen, setShowScreen] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => setShowScreen(true), 50);
		return () => clearTimeout(timeoutId);
	}, [showScreen]);

	return (
		<>
			<main className={`issues-list ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<InxSearchAndData refetch={() => {}} />
				</section>
				<section className="right">
					<InxPreviousSearches isLoading={false} previousSearches={[]} />
				</section>
			</main>
		</>
	);
};

export default InxPanel;
