import { useAppSelector, useModal } from 'app/data';
import { LanApplicationService } from 'app/data/services/lan.service';
import {
	DeletewebResource,
	EmptyCard,
	ModalTitleWrapper,
	ModalWrapper,
	PageLoader,
	AddAccessPointModal,
	AddNetworkDeviceModal,
	LanIcon,
	TrashIcon,
} from '../../../../../components';

import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

interface Network {
	id: number;
	device_in_address: string;
	device_ex_address: string;
	device_os: string;
	device_vendor: string;
	device_name: string;
	childs?: Network[];
}

interface LanNetworkDataProps {
	isLoading: boolean;
	internalNetwork: Network[];
	refetchInternalNetwork: () => void;
}

export const LanNetworkData: React.FC<LanNetworkDataProps> = (props) => {
	const companiID = useAppSelector(
		(state) => state.authState.userData?.companyID,
	);
	const { showModal, setShowModal, setShowModalStr, showModalStr } =
		useModal();
	const [selectedLanIdToDelete, setSelectedLanIdToDelete] = useState<
		string | null
	>(null);
	const [isDeletingLan, setIsDeletingLan] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleDelete = () => {
		setIsDeletingLan(true);
		LanApplicationService.delete(selectedLanIdToDelete!, companiID!)
			.then(() => {
				navigate(0);
				setShowModal(!showModal);
				toast.success('Successfully Deleted lan...');
			})
			.finally(() => {
				setIsDeletingLan(false);
			});
	};

	return (
		<>
			<ModalTitleWrapper
				isActive={showModal && showModalStr === 'delete_resource'}
				headerTitle="Delete LAN"
				close={() => {}}>
				<DeletewebResource
					isDeleting={isDeletingLan}
					onDelete={handleDelete}
					id={selectedLanIdToDelete}
					onDone={() => {
						window.location.reload();
					}}
				/>
			</ModalTitleWrapper>

			<ModalTitleWrapper
				close={() => {}}
				isActive={showModal && showModalStr === 'add_access_point'}
				headerTitle="Add access point">
				<AddAccessPointModal
					onDone={() => {
						props.refetchInternalNetwork();
					}}
				/>
			</ModalTitleWrapper>

			<ModalTitleWrapper
				headerTitle="Add network device"
				close={() => {}}
				isActive={showModal && showModalStr === 'add_network_device'}>
				<AddNetworkDeviceModal
					internalNetwork={props.internalNetwork ?? []}
				/>
			</ModalTitleWrapper>

			<div className="card table flex-grow">
				<div className="header">
					<div className="title">
						<div className="icon">
							<LanIcon />
						</div>
						<span>Internal network structure</span>
					</div>
					<div className="actions">
						<div
							onClick={() => {
								setShowModal(!showModal);
								setShowModalStr('add_access_point');
							}}>
							Add access point
						</div>
						<div
							onClick={() => {
								setShowModal(!showModal);
								setShowModalStr('add_network_device');
							}}>
							Add network device
						</div>
					</div>
				</div>

				<div className="columns-name">
					<div className="id">id</div>
					<div className="ip">internal IP</div>
					<div className="ip">external IP</div>
					<div className="os">os / vendor</div>
					<div className="hostname">hostname</div>
					<div className="id">actions</div>
				</div>

				{!props.isLoading ? (
					<div className="rows">
						{props.internalNetwork.map((network) => (
							<Fragment key={network.id}>
								<div className="item left-marked">
									<div className="id">{network.id}</div>
									<div className="ip">{network.device_in_address}</div>
									<div className="ip">{network.device_ex_address}</div>
									<div className="os">
										{network.device_os}/{network.device_vendor}
									</div>
									<div className="hostname">{network.device_name}</div>
									<div
										className="id cursor-pointer p-3 flex"
										onClick={() => {
											setSelectedLanIdToDelete(network?.id as any);
											setShowModal(!showModal);
											setShowModalStr('delete_resource');
										}}>
										<TrashIcon />
									</div>
								</div>

								{network.childs!.map((subNetwork) => (
									<div className="item" key={subNetwork.id}>
										<div className="id">{subNetwork.id}</div>
										<div className="ip lined">
											<span className="sub-domain-icon-v"></span>
											<span className="sub-domain-icon-h"></span>
											{subNetwork.device_in_address}
										</div>
										<div className="ip">
											{subNetwork.device_ex_address}
										</div>
										<div className="os">
											{subNetwork.device_os}/
											{subNetwork.device_vendor}
										</div>
										<div className="hostname">
											{subNetwork.device_name}
										</div>
										<div
											className=""
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												return false;
											}}>
											<div
												className="id cursor-pointer p-3 flex"
												onClick={() => {
													setSelectedLanIdToDelete(
														subNetwork?.id as any,
													);
													setShowModal(!showModal);
													setShowModalStr('delete_resource');
												}}>
												<TrashIcon />
											</div>
										</div>
									</div>
								))}
							</Fragment>
						))}
					</div>
				) : (
					<PageLoader />
				)}
			</div>
			{!props.isLoading && props.internalNetwork.length === 0 && (
				<EmptyCard />
			)}
		</>
	);
};
