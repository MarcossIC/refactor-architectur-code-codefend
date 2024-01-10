// Core packages
import { useAppSelector } from '../../../../../data';
import { LanApplicationService } from '../../../../../data/services/lan.service';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { invoke } from '@tauri-apps/api/tauri';

export const LanPage: React.FC = () => {
	const companyID = useAppSelector(
		(state) => state.authState.userData?.companyID,
	) as string;
	const [scanLoading, setScanLoading] = useState(false);

	const getInternalNetworks = async () => {
		try {
			const data = await LanApplicationService.getAll(companyID);
			return data;
		} catch (error) {
			console.log({ error });
		}
	};

	const [internalNetwork, setInternalNetwork] = useState({
		loading: true,
		data: {},
	});

	const internalNetworkDataInfo = () => {
		return internalNetwork.loading ? {} : internalNetwork.data;
	};

	const [showScreen, setShowScreen] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setShowScreen(true);
		}, 50);

		return () => clearTimeout(timeoutId);
	}, []);

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

	return (
		<>
			<main className={`lan ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<InternalNetworks
						isLoading={internalNetwork.loading}
						refetchInternalNetwork={() =>
							setInternalNetwork({ loading: true, data: {} })
						}
						internalNetwork={
							internalNetworkDataInfo().disponibles ?? []
						}
					/>
				</section>
				<section className="right">
					<InternalNetworksChart
						isLoading={internalNetwork.loading}
						internalNetwork={
							internalNetworkDataInfo().disponibles ?? []
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
