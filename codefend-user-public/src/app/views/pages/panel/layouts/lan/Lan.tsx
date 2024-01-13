// Core packages
import { invoke } from '@tauri-apps/api/tauri';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Device, useLan } from '../../../../../data';
import { PageLoaderWhite } from '../../../../../views/components';
import '../../../../styles/flag.scss';
import '../../../../styles/table.scss';
import { LanNetworkData } from './components/LanNetworkData';
import { LanNetworksChart } from './components/LanNetworksChart';

const LanPage: React.FC = () => {
	const { networks, loading, refetch } = useLan();

	const [scanLoading, setScanLoading] = useState(false);
	
	const [internalNetwork, setInternalNetwork] = useState({
		loading: true,
		data: [] as Device[],
	});

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

	const internalNetworkDataInfo = () => {
		const internalNetworkData = loading ? [] : networks;
		return internalNetworkData ?? [];
	};

	const [showScreen, setShowScreen] = useState(false);

	useEffect(() => {
		refetch();
		const timeoutId = setTimeout(() => {
			setShowScreen(true);
		}, 50);

		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<>
			<main className={`lan ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<LanNetworkData
						isLoading={loading}
						refetchInternalNetwork={refetch}
						internalNetwork={internalNetworkDataInfo()}
					/>
				</section>

				<section className="right">
					<LanNetworksChart
						isLoading={loading}
						internalNetwork={internalNetworkDataInfo()}
					/>
					<button
						onClick={() => {
							scanLocal();
						}}
						className="btn btn-primary full-w mt-4">
						{scanLoading ? <PageLoaderWhite /> : 'REQUEST SCAN'}
					</button>
				</section>
			</main>
		</>
	);
};
export default LanPage;
