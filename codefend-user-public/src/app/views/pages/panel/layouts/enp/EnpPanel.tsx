import {
	useModal,
	useSourceCode,
	useEnp,
	useAuthState,
	useScanLocal,
} from '../../../../../data';
import { EmptyScreenView, PageLoaderWhite, Show } from '../../../../components';
import React, { useEffect, useState } from 'react';
import { Endpoints } from './components/Endpoints';

interface Props {}

export const EnpPanel: React.FC<Props> = (props) => {
	const [showScreen, setShowScreen] = useState(false);
	const { getAccessToken } = useAuthState();
	const { getEndpoints, refetch, isLoading, handleDelete } = useEnp();
	const { scanLoading, scanLocal } = useScanLocal(getAccessToken());
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		refetch();
		setShowScreen(false);
		const timeoutId = setTimeout(() => setShowScreen(true), 50);
		return () => clearTimeout(timeoutId);
	}, [refresh]);

	return (
		<>
			<main className={`lan ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<Endpoints
						isLoading={isLoading}
						onDelete={(id: string) =>
							handleDelete(id).finally(() => setRefresh(!refresh))
						}
						endpoints={
							Boolean('data' in getEndpoints())
								? getEndpoints().data
								: []
						}
					/>
				</section>
				<section className="right">
					<button
						onClick={(e) => scanLocal()}
						className="btn btn-primary w-full">
						<Show when={scanLoading}>
							<PageLoaderWhite />
						</Show>
						REQUEST SCAN
					</button>
				</section>
			</main>
		</>
	);
};

export default EnpPanel;
