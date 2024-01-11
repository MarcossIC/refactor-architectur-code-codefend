import React, { useEffect, useState } from 'react';
import { WebApplicationResources } from './components/WebApplicationResources';
import { WebApplicationLocation } from './components/WebApplicationLocation';
import { WebApplicationStatics } from './components/WebApplicationStatics';
import { WebApplicationCredentials } from './components/WebApplicationCredentials';
import { useWebapplication } from '../../../../../data';
import '../../../../styles/flag.scss';
import '../../../../styles/table.scss';
import './webapplication.scss';

const WebApplicationView: React.FC = () => {
	const { webResources, isLoading, refetch } = useWebapplication();
	const [showScreen, setShowScreen] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => setShowScreen(true), 50);
		return () => clearTimeout(timeoutId);
	}, [showScreen]);

	return (
		<main className={`webapp ${showScreen ? 'actived' : ''}`}>
			<section className="left">
				<WebApplicationResources
					isLoading={isLoading}
					refetch={refetch}
					webResources={webResources.resources}
				/>
			</section>
			<section className="right">
				<WebApplicationLocation
					isLoading={isLoading}
					webResources={webResources.resources}
				/>

				<WebApplicationStatics
					webResources={webResources.resources}
					isLoading={isLoading}
				/>

				<WebApplicationCredentials />
			</section>
		</main>
	);
};

export default WebApplicationView;
