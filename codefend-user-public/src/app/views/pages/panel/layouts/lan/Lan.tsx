// Core packages
import { invoke } from '@tauri-apps/api/tauri';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Network, useAuthState } from '../../../../../data';
import { LanApplicationService } from '../../../../../data/services/lan.service';
import { PageLoaderWhite } from '../../../../../views/components';
import { LanNetworkData } from './components/LanNetworkData';
import { LanNetworksChart } from './components/LanNetworksChart';
import { InternalNetworks } from '.';

const LanPage: React.FC = () => {
	const { getUserdata } = useAuthState();

	const [scanLoading, setScanLoading] = useState(false);
	const [internalNetwork, setInternalNetwork] = useState({
		loading: true,
		data: [] as Network[],
	});

	const fetch = useCallback(() => {
		const companyID: string = getUserdata()?.companyID;
		setScanLoading(true);
		LanApplicationService.getAll(companyID)
			.then((response: any) => {
				setInternalNetwork((current) => ({ ...current, data: response }));
			})
			.finally(() => {
				setScanLoading(true);
			});
	}, [getUserdata]);

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
		const internalNetworkData = scanLoading ? [] : internalNetwork;
		return internalNetworkData ?? [];
	};

	const [showScreen, setShowScreen] = useState(false);

	useEffect(() => {
		fetch();
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
						isLoading={internalNetwork.loading}
						refetchInternalNetwork={() =>
							setInternalNetwork({ loading: true, data: [] })
						}
						internalNetwork={internalNetworkDataInfo() as Network[]}
					/>
				</section>

				<section className="right">
					<LanNetworksChart
						isLoading={internalNetwork.loading}
						internalNetwork={internalNetworkDataInfo() as Network[]}
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
