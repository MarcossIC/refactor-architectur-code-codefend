import { useAppSelector, useModal } from 'app/data';
import { LanApplicationService } from 'app/data/services/lan.service';
import { EmptyCard, ModalWrapper, PageLoader } from 'app/views/components';

import AddAccessPointModal from 'app/views/components/modals/AddAccessPointModal';
import { AddNetworkDeviceModal } from 'app/views/components/modals/AddNetworkDeviceModal';
import { DeletewebResource } from 'app/views/components/modals/DeleteWebResource';
import React, { useState } from 'react';
import { FaServer, FaTrashAlt } from 'react-icons/fa';
import { HiOutlineBars3BottomLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export interface Network {
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
			{showModal && showModalStr === 'delete_resource' && (
				<ModalWrapper>
					<div className="w-full w-96 internal-tables disable-border">
						<div className="modal-header">
							<HiOutlineBars3BottomLeft className="text-lg mr-2 text-fend-red" />
							<span className="text-sm">Delete LAN</span>
						</div>
						<DeletewebResource
							isDeleting={isDeletingLan}
							onDelete={handleDelete}
							id={selectedLanIdToDelete}
							onDone={() => {
								navigate(0);
							}}
						/>
						<div className="container flex items-center justify-center mx-auto p-3 text-format"></div>
					</div>
				</ModalWrapper>
			)}

			{showModal && showModalStr === 'add_access_point' && (
				<ModalWrapper>
					<div className="w-full w-96 internal-tables disable-border">
						<div className="modal-header">
							<HiOutlineBars3BottomLeft className="text-lg mr-2 text-fend-red" />
							<span className="text-sm">Add access point</span>
						</div>
						<AddAccessPointModal
							onDone={() => {
								props.refetchInternalNetwork();
							}}
						/>
						<div className="container flex items-center justify-center mx-auto p-3 text-format"></div>
					</div>
				</ModalWrapper>
			)}

			{showModal && showModalStr === 'add_network_device' && (
				<ModalWrapper>
					<div className="w-full w-96 internal-tables disable-border">
						<div className="modal-header">
							<HiOutlineBars3BottomLeft className="text-lg mr-2 text-fend-red" />
							<span className="text-sm">Add network device</span>
						</div>
						<AddNetworkDeviceModal
							internalNetwork={props.internalNetwork ?? []}
						/>
						<div className="container flex items-center justify-center mx-auto p-3 text-format"></div>
					</div>
				</ModalWrapper>
			)}

			<div className="card table flex-grow">
				<div className="header">
					<div className="title">
						<div className="icon">
							<FaServer />
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
							<React.Fragment key={network.id}>
								<div className="item left-marked">
									<div className="id">{network.id}</div>
									<div className="ip">
										{network.device_in_address}
									</div>
									<div className="ip">
										{network.device_ex_address}
									</div>
									<div className="os">
										{network.device_os}/
										{network.device_vendor}
									</div>
									<div className="hostname">
										{network.device_name}
									</div>
									<div
										className="id cursor-pointer p-3 flex"
										onClick={() => {
											setSelectedLanIdToDelete(String(network?.id));
											setShowModal(!showModal);
											setShowModalStr('delete_resource');
										}}>
										<FaTrashAlt />
									</div>
								</div>

								{network.childs!.map((subNetwork) => (
									<div className="item" key={subNetwork.id}>
										<div className="id">
											{subNetwork.id}
										</div>
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
													setSelectedLanIdToDelete(String(network?.id));
													setShowModal(!showModal);
													setShowModalStr(
														'delete_resource',
													);
												}}>
												<FaTrashAlt />
											</div>
										</div>
									</div>
								))}
							</React.Fragment>
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
