import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
	AddDomainModal,
	AddSubDomainModal,
	DeletewebResource,
	GlobeWebIcon,
	EmptyCard,
	PageLoader,
	TrashIcon,
	StatIcon,
	ModalTitleWrapper,
	ConfirmModal,
} from '../../../../../components';
import {
	Resouce,
	Webresources,
	generateIDArray,
	useDeleteWebResource,
	useModal,
} from '../../../../../../data';

interface WebResourcesProps {
	refresh: () => void;
	webResources: Webresources[];
	isLoading: boolean;
}

export const WebApplicationResources: React.FC<WebResourcesProps> = (props) => {
	const [selectedId, setSelectedId] = useState<string>('0');
	const { showModal, setShowModal, showModalStr, setShowModalStr } =
		useModal();
	const navigate = useNavigate();
	const { handleDelete, isDeletingResource } = useDeleteWebResource();

	const getResources = () => {
		const resources = props.isLoading ? [] : props.webResources;

		return resources ?? [];
	};

	const resourceKeys = useMemo(
		() => generateIDArray(getResources().length),
		[getResources()],
	);

	const show = useCallback(() => {
		setShowModal(true);
	}, []);
	const close = useCallback(() => {
		setShowModal(false);
	}, []);

	return (
		<>
			<ModalTitleWrapper
				isActive={showModal && showModalStr === 'add_domain'}
				close={close}
				headerTitle="Add web resource">
				<AddDomainModal
					onDone={() => {
						setShowModal(!showModal);
						props.refresh();
					}}
					close={() => setShowModal(false)}
				/>
			</ModalTitleWrapper>

			<ModalTitleWrapper
				isActive={showModal && showModalStr === 'delete_resource'}
				close={close}
				headerTitle="Delete web resource">
				<ConfirmModal
					header=""
					cancelText="Cancel"
					confirmText="Delete"
					close={close}
					action={() =>
						handleDelete(props.refresh, selectedId).then(() =>
							setShowModal(!showModal),
						)
					}
				/>
			</ModalTitleWrapper>

			<ModalTitleWrapper
				isActive={showModal && showModalStr === 'add_subdomain'}
				close={close}
				headerTitle="Add web sub-resource">
				<AddSubDomainModal
					onDone={() => {
						setShowModal(!showModal);
						props.refresh();
					}}
					close={close}
					webResources={getResources()}
				/>
			</ModalTitleWrapper>

			<div className="card web-resources table">
				<div className="header">
					<div className="title">
						<div className="icon">
							<GlobeWebIcon />
						</div>
						<span>Detected domains and subdomains</span>
					</div>

					<div className="actions">
						<div
							onClick={() => {
								if (props.isLoading) return;

								setShowModal(!showModal);
								setShowModalStr('add_domain');
							}}>
							Add domain
						</div>
						<div
							onClick={() => {
								if (props.isLoading) return;

								setShowModal(!showModal);
								setShowModalStr('add_subdomain');
							}}>
							Add subdomain
						</div>
					</div>
				</div>

				<div className="columns-name">
					<div className="id">id</div>
					<div className="domain-name">domain</div>
					<div className="server-ip">main server</div>
					<div className="location">location</div>
					<div className="province">province, city</div>
					<div className="id">actions</div>
				</div>

				{!props.isLoading ? (
					<div className="rows">
						{getResources()
							.reverse()
							.map((mainNetwork: Webresources, index: number) => (
								<Fragment key={resourceKeys[index]}>
									<div className="item left-marked">
										<div className="id">{mainNetwork.id}</div>
										<div className="domain-name">
											{mainNetwork.resourceDomain}
										</div>
										<div className="server-ip">
											{mainNetwork.mainServer}
										</div>
										<div className="location">
											<span
												className={`flag flag-${mainNetwork.serverCountryCode.toLowerCase()}`}></span>
											<p className="">{mainNetwork.serverCountry}</p>
										</div>
										<div className="province">
											{mainNetwork.serverCountryProvince},{' '}
											{mainNetwork.serverCountryCity}
										</div>

										<div
											className="trash"
											onClick={() => {
												setSelectedId(mainNetwork.id);
												setShowModal(!showModal);
												setShowModalStr('delete_resource');
											}}>
											<TrashIcon />
										</div>
									</div>

									{mainNetwork.childs.map((subNetwork: Resouce) => (
										<div key={subNetwork.id} className="item">
											<div className="id">{subNetwork.id}</div>
											<div className="domain-name lined">
												<span className="sub-domain-icon-v"></span>
												<span className="sub-domain-icon-h"></span>
												<span className="sub-resource-domain">
													{subNetwork.resourceDomain}
												</span>
											</div>

											<div className="server-ip">
												{subNetwork.mainServer}
											</div>
											<div className="location">
												<span
													className={`flag flag-${subNetwork.serverCountryCode.toLowerCase()}`}></span>
												<p className="">
													{subNetwork.serverCountry}
												</p>
											</div>

											<div className="province">
												<span className="province-container">
													{subNetwork.serverCountryProvince},{' '}
													{subNetwork.serverCountryCity}
												</span>
											</div>
											<div className="trash">
												<TrashIcon
													action={() => {
														setSelectedId(subNetwork.id);
														setShowModal(!showModal);
														setShowModalStr('delete_resource');
													}}
												/>
											</div>
										</div>
									))}
								</Fragment>
							))}
					</div>
				) : (
					<>
						<PageLoader />
					</>
				)}

				{!props.isLoading && getResources().length === 0 ? (
					<>
						<EmptyCard />
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
};
