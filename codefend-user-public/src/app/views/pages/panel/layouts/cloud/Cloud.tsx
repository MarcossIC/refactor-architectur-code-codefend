import React, { useEffect, useState } from 'react';
import { EmptyScreenView } from '../../../../components';
import './cloud.scss';
import { useModal } from 'src/app/data';

interface MobileApp {
	id: string;
}

const CloudApplicationPanel: React.FC = () => {
	const [showScreen, setShowScreen] = useState<boolean>(false);

	const [selectedCloudApp, setSelectedCloudApp] = useState(null);

	const { setShowModal, setShowModalStr, showModal, showModalStr } =
		useModal();

	const handleCloudAppClick = (cloud: any) => {
		console.log({ cloud, selectedCloudApp });
		if (cloud.id === (selectedCloudApp ? selectedCloudApp.id : null))
			return;
		setSelectedCloudApp(cloud);
	};

	const handleActiveCloudValidation = (cloud: any) => {
		return cloud.id === (selectedCloudApp ? selectedCloudApp.id : null);
	};

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
