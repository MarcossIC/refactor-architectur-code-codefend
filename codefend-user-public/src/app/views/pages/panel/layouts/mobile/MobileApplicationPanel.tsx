import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { PageLoader } from '../../../../components';
import { useModal } from '../../../../../data';

import './mobileApplicationPanel.scss';
import { useNavigate } from 'react-router';
import { MobileApplication } from './components/MobileApplication';

const ModalTitleWrapper = lazy(
	() => import('../../../../components/modals/ModalTitleWrapper'),
);
const AddMobileModal = lazy(
	() => import('../../../../components/modals/AddMobileModal'),
);

const MobileApplicationPanel: React.FC = () => {
	const { showModal, setShowModal } = useModal();
	const [showScreen, setShowScreen] = useState<boolean>(false);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		setShowModal(false);
		const timeoutId = setTimeout(() => setShowScreen(true), 50);
		return () => clearTimeout(timeoutId);
	}, [refresh]);

	return (
		<>
			<ModalTitleWrapper
				isActive={showModal}
				headerTitle="Add mobile app"
				close={() => setShowModal(false)}>
				<AddMobileModal
					onDone={() => setRefresh(!refresh)}
					close={() => setShowModal(false)}
				/>
			</ModalTitleWrapper>

			<main className={`mobile ${showScreen ? 'actived' : ''}`}>
				<Suspense fallback={<PageLoader />}>
					<MobileApplication
						openModal={() => setShowModal(true)}
						refresh={() => setRefresh(!refresh)}
					/>
				</Suspense>
			</main>
		</>
	);
};

export default MobileApplicationPanel;
