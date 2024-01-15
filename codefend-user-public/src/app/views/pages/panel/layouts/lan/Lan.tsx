// Core packages
import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { toast } from 'react-toastify';
import { Device, useLan } from '../../../../../data';
import { PageLoaderWhite, Show } from '../../../../../views/components';
import { LanNetworkData } from './components/LanNetworkData';
import { LanNetworksChart } from './components/LanNetworksChart';
import '../../../../styles/flag.scss';
import '../../../../styles/table.scss';

const LanPage: React.FC = () => {
	const { loading, networks, refetch } = useLan();
	const [showScreen, setShowScreen] = useState(false);
	const [control, refresh] = useState(false);
	const [scanLoading, setScanLoading] = useState(false);

	const scanLocal = async () => {
		setScanLoading(true);
		return invoke('scan_local')
			.then((res: any) => {
				const parsedRes = JSON.parse(res);

				console.log(parsedRes);

				if (parsedRes.success) {
					setScanLoading(false);
					toast.success(parsedRes.success);
				} else {
					setScanLoading(false);
				}
			})
			.catch((err: any) => {
				setScanLoading(false);
				const parsedErr = JSON.parse(err);

				if (parsedErr.error) {
					toast.error(parsedErr.error);
				}
			});
	};

	const internalNetworkDataInfo = (): Device[] => {
		const internalNetworkData = !loading ? networks : [];
		console.log({ internalNetworkData });
		return internalNetworkData ?? [];
	};

	useEffect(() => {
		refetch();
		setShowScreen(false);
		const timeoutId = setTimeout(() => {
			setShowScreen(true);
		}, 50);

		return () => clearTimeout(timeoutId);
	}, [control]);

	return (
		<>
			<main className={`lan ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<LanNetworkData
						isLoading={loading}
						refetchInternalNetwork={() => refresh(!control)}
						internalNetwork={internalNetworkDataInfo()}
					/>
				</section>

				<section className="right">
					<LanNetworksChart
						isLoading={loading}
						internalNetwork={internalNetworkDataInfo()}
					/>
					<button
						onClick={() => scanLocal()}
						className="btn btn-primary w-full mt-4">
						<Show when={scanLoading} fallback={<>{'REQUEST SCAN'}</>}>
							<PageLoaderWhite />
						</Show>
					</button>
				</section>
			</main>
		</>
	);
};
export default LanPage;
