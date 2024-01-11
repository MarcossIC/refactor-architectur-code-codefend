// Core packages
import { invoke } from '@tauri-apps/api/tauri';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../../data';
import { LanApplicationService } from '../../../../../data/services/lan.service';
import { PageLoaderWhite } from '../../../../../views/components';
import { LanNetworkData, Network } from './components/LanNetworkData';
import { LanNetworksChart } from './components/LanNetworksChart';



const LanPage: React.FC = () => {
	
	const companyID = useAppSelector(
		(state) => state.authState.userData?.companyID,
	) as string;
	
	
	const [scanLoading, setScanLoading] = useState(false);
	
	const getInternalNetworks = async () => {
		try {
			const data = await LanApplicationService.getAll(companyID);
			console.log(data)
			return data;
		} catch (error) {
			console.log({ error });
		}
	};
	
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
	const [internalNetwork, setInternalNetwork] = useState({
		loading: true,
		data: [] as Network[],
	});

	const internalNetworkDataInfo = () => {
    const internalNetworkData = internalNetwork.loading
      ? {}
      : getInternalNetworks();
    return internalNetworkData ?? [];
  };

	const [showScreen, setShowScreen] = useState(false);

	useEffect(() => {
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
						internalNetwork={
							internalNetworkDataInfo()  as Network[]
						}
					/> 
					<button
						onClick={() => {
							scanLocal();
						}}
						className="btn btn-primary full-w mt-4">
						{scanLoading ? <PageLoaderWhite /> : 'REQUEST SCAN'}
					</button>
					{/* <InternalNetworks /> */}
				</section>
			</main>
		</>
	);
};
export default LanPage