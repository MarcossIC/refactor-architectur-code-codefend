import React, { Fragment, ReactNode, useMemo, useState } from 'react';
import {
	ModalWrapper,
	AddDomainModal,
	AddSubDomainModal,
	DeletewebResource,
	GlobeWebIcon,
	EmptyCard,
	PageLoader,
	TrashIcon,
} from '../../../../components';
import { useNavigate } from 'react-router';
import { Resouce, Webresources, generateIDArray } from '../../../../../data';
import '../../../../shared/table.scss';

interface WebResourceModalWrapper {
	children: ReactNode;
	headerTitle: string;
	isActive: boolean;
}

const WebResourceModalWrapper: React.FC<WebResourceModalWrapper> = ({
	children,
	headerTitle,
	isActive,
}) => {
	return (
		<>
			{isActive ?? (
				<>
					<ModalWrapper>
						<div className="web-modal-wrapper internal-tables disable-border">
							<div className="modal-header">
								<div className="icon">
									|
									<span className="text-fend-red">
										{' '}
										{headerTitle}{' '}
									</span>
									|
								</div>
							</div>
							{children}
							<div className="modal-helper-box text-format"></div>
						</div>
					</ModalWrapper>
				</>
			)}
		</>
	);
};

interface WebResourcesProps {
	refetch: () => void;
	webResources: Webresources[];
	isLoading: boolean;
}

export const WebApplicationResources: React.FC<WebResourcesProps> = (props) => {
	const [selectedId, setSelectedId] = useState('0');
	const { showModal, showModalStr } = { showModal: false, showModalStr: '' };
	const navigate = useNavigate();

	const getResources = () => {
		const resources = props.isLoading ? [] : props.webResources;

		return resources ?? [];
	};

	const resourceKeys = useMemo(
		() => generateIDArray(getResources().length),
		[getResources()],
	);

	return (
		<>
			<WebResourceModalWrapper
				isActive={showModal && showModalStr === 'add_domain'}
				headerTitle="Add web resource">
				<AddDomainModal onDone={() => props.refetch()} />
			</WebResourceModalWrapper>

			<WebResourceModalWrapper
				isActive={showModal && showModalStr === 'delete_resource'}
				headerTitle="Delete web resource">
				<DeletewebResource
					id={selectedId}
					isDeleting={true}
					onDone={() => {
						navigate('/');
					}}
				/>
			</WebResourceModalWrapper>

			<WebResourceModalWrapper
				isActive={showModal && showModalStr === 'add_subdomain'}
				headerTitle="Add web sub-resource">
				<AddSubDomainModal
					onDone={() => props.refetch()}
					webResources={getResources()}
				/>
			</WebResourceModalWrapper>

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

								//modal
							}}>
							Add domain
						</div>
						<div
							onClick={() => {
								if (props.isLoading) return;

								//modal
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
										<div className="id">
											{mainNetwork.id}
										</div>
										<div className="domain-name">
											{mainNetwork.resourceDomain}
										</div>
										<div className="server-ip">
											{mainNetwork.mainServer}
										</div>
										<div className="location">
											<span
												className={`flag flag-${mainNetwork.serverCountryCode.toLowerCase()}`}></span>
											<p className="">
												{mainNetwork.serverCountry}
											</p>
										</div>
										<div className="province">
											{mainNetwork.serverCountryProvince},{' '}
											{mainNetwork.serverCountryCity}
										</div>

										<div
											className="trash"
											onClick={() => {
												setSelectedId(mainNetwork.id);
												//modal
											}}>
											<TrashIcon />
										</div>
									</div>

									{mainNetwork.childs.map(
										(subNetwork: Resouce) => (
											<div
												key={subNetwork.id}
												className="item">
												<div className="id">
													{subNetwork.id}
												</div>
												<div className="domain-name lined">
													<span className="sub-domain-icon-v"></span>
													<span className="sub-domain-icon-h"></span>
													<span className="sub-resource-domain">
														{
															subNetwork.resourceDomain
														}
													</span>
												</div>

												<div className="server-ip">
													{subNetwork.mainServer}
												</div>
												<div className="location">
													<div
														className={`flag flag-${subNetwork.serverCountryCode.toLowerCase()}`}></div>
													<div className="">
														{
															subNetwork.serverCountry
														}
													</div>
												</div>

												<div className="province">
													{
														subNetwork.serverCountryProvince
													}
													,{' '}
													{
														subNetwork.serverCountryCity
													}
												</div>
												<div
													className="trash"
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();
														return false;
													}}>
													<TrashIcon />
												</div>
											</div>
										),
									)}
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
