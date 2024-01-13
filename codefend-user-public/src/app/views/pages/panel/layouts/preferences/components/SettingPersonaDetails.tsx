import { formatDate } from '../../../../../../data';
import { useCompany } from '../../../../../../data/hooks/useCompany';

import { EmptyCard, PageLoader } from 'app/views/components';
import React, { useState } from 'react';

interface CompanyDataProps {
	orders: any[];
	isLoading?: boolean;
	companyInfo: any[];
}

interface CompanyInfo {
	name: string;
	web: string;
	mercado: string;
	owner_fname: string;
	owner_lname: string;
	owner_email: string;
	pais_provincia: string;
	location: string;
	address: string;
}

const SettingCompanyInformation: React.FC<CompanyDataProps> = (props) => {
	const { companyInfo } = useCompany();

	const getCompanyData = (companyInfo: any) => {
		return {
			name: companyInfo.name,
			web: companyInfo.web,
			mercado: companyInfo.mercado,
			owner: `${companyInfo.owner_fname} ${companyInfo.owner_lname}`,
			email: companyInfo.owner_email,
			location: companyInfo.pais_provincia,
			address: `${
				companyInfo.address === 'non available' ? '-' : companyInfo.address
			}`,
		};
	};

	return (
		<>
			<div className="card table">
				<div className="header">
					<div className="title">
						<div className="icon">
							{/* <RiUserFacesUserSettingsFill /> */}
						</div>
						<span>ORDERS & BILLING DETAILS</span>
					</div>
				</div>

				<div className="columns-name">
					<div className="date">date</div>
					<div className="full-name">order</div>
					<div className="duration">duration</div>
					<div className="price">price</div>
					<div className="price">discount</div>
					<div className="price">final price</div>
					<div className="status">status</div>
				</div>

				<div className="rows">
					{!props.isLoading ? (
						props.orders.length > 0 ? (
							props.orders.map((order: any) => (
								<div key={order.order_id} className="item">
									<div className="date">
										{formatDate(order?.creacion ?? new Date())}
									</div>
									<div className="full-name">{order.order_desc}</div>
									<div className="duration">{order.order_plazo}</div>
									<div className="price">${order.order_price}</div>
									<div className="price">
										{order.order_price_disc}%
									</div>
									<div className="price">
										${order.order_price_final}
									</div>
									<div className="status">{order.order_paid}</div>
								</div>
							))
						) : (
							<EmptyCard />
						)
					) : (
						<PageLoader />
					)}
				</div>
			</div>
			{!props.isLoading && props.orders.length === 0 ? <EmptyCard /> : null}
		</>
	);
};

export default SettingCompanyInformation;
