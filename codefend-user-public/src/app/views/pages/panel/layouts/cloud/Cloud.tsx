import React, { useEffect, useState } from 'react';
import { EmptyScreenView } from '../../../../components';
import './cloud.scss';

interface MobileApp {
	id: string;
}

const CloudApplicationPanel: React.FC = () => {
	const [showScreen, setShowScreen] = useState<boolean>(false);

	useEffect(() => {
		setTimeout(() => setShowScreen(true), 50);
	}, []);
	return (
		<>
			<main className={`mobile cloud ${showScreen ? 'actived' : ''}`}>
				<EmptyScreenView
					buttonText="Add Cloud"
					title={"There's no data to display here"}
					info={'Start by clicking on the button below'}
					event={() => {}}
				/>
			</main>
		</>
	);
};

export default CloudApplicationPanel;
