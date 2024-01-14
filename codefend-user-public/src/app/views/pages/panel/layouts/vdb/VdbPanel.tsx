import { EmptyScreenView } from '../../../../components';
import React, { useEffect, useState } from 'react';

interface Props {}

const VdbPanel: React.FC<Props> = (props) => {
	const [showScreen, setShowScreen] = useState(false);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		//refetch();
		const timeoutId = setTimeout(() => setShowScreen(true), 50);
		return () => clearTimeout(timeoutId);
	}, [refresh]);
	return (
		<>
			<main className={`support ${showScreen ? 'actived' : ''}`}></main>
		</>
	);
};

export default VdbPanel;
