import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { ModalTitleWrapper, PageLoader, Show } from '../../../../components';
import { useMobile, useModal } from '../../../../../data';

import './mobileApplicationPanel.scss';
import { useNavigate } from 'react-router';
import { MobileApplication } from './components/MobileApplication';
import { useUpdateEffect } from 'usehooks-ts';
import AddMobileModal from '../../../../components/modals/AddMobileModal';

const MobileApplicationPanel: React.FC = () => {
	const { showModal, setShowModal } = useModal();
	const [showScreen, setShowScreen] = useState<boolean>(false);
	const [refresh, setRefresh] = useState(false);
	const { getMobileInfo, refetch, isLoading } = useMobile();

	useEffect(() => {
		refetch();
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
				<Show when={!isLoading}>
					<MobileApplication
						openModal={() => setShowModal(true)}
						refresh={() => setRefresh(!refresh)}
						mobileInfo={getMobileInfo()}
						isLoading={isLoading}
					/>
				</Show>
			</main>
		</>
	);
};

export default MobileApplicationPanel;
