import React, { useEffect, useState } from 'react';
import { InxSearchAndData } from './components/InxSearchAndData';
import { InxPreviousSearches } from './components/InxPreviousSearches';
import { useInxPreviousSearch } from '../../../../../data';

export const InxPanel: React.FC = () => {
	const [showScreen, setShowScreen] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const { previousSearches, isLoading, refetch } = useInxPreviousSearch();
	useEffect(() => {
		refetch();
		setShowScreen(false);
		const timeoutId = setTimeout(() => setShowScreen(true), 50);
		return () => clearTimeout(timeoutId);
	}, [refresh]);

	return (
		<>
			<main className={`issues-list ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<InxSearchAndData refetch={() => setRefresh(!refetch)} />
				</section>
				<section className="right">
					<InxPreviousSearches
						isLoading={isLoading}
						previousSearches={previousSearches ?? ([] as any)}
					/>
				</section>
			</main>
		</>
	);
};

export default InxPanel;
