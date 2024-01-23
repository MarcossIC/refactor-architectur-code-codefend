import { defaultCompanyCardData } from '../../../../../../../data';
import React, { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import "./CompanyIndexView.scss";
import { SearchIcon } from '../../../../../../components';

const initialCompanyState = {
	companies: defaultCompanyCardData,
	searchQuery: '',
	companyStore: [] as any,
};

const CompanyIndexView: React.FC = () => {
	const [{ companies, companyStore, searchQuery }, setCompanyState] =
		useState(initialCompanyState);

		console.log(companies)

	const companiesToRender = () => {
		if (searchQuery.trim() === '' || searchQuery.trim().length < 2)
			return companies;
		const _companies = companies;
		const query = searchQuery;
		console.log('hereeeee');
		return _companies.filter((company: any) =>
			company.name.toLowerCase().includes(query.toLowerCase()),
		);
	};

	useEffect(() => {
		companiesToRender()
	})

	const isSelectedCompany = (company: any) => {
		if (!company || !company?.id) return false;

		const selected = companyStore?.id === company?.id;
		return selected;
	};

	return (
		<>
			<div className="CompanyIndexView">
				{Boolean(companies.length) && (
					<div className="company-search relative">
						<input
							type="text"
							value={searchQuery}
							onChange={(e) =>
								setCompanyState((prevState) => ({
									...prevState,
									searchQuery: e.target.value,
								}))
							}
							placeholder="Search Company"
							className="text w-full"
							required
						/>
						<div style={{color: 'black'}}>
							<SearchIcon />
						</div>
					</div>
				)}
				<div className="companies">
					{companiesToRender().map((company: any) => (
						<div
							onClick={() => {
								setCompanyState((prevState) => {
									if (isSelectedCompany(company)) {
										return { ...prevState, companyStore: null };
									} else {
										return { ...prevState, companyStore: company };
									}
								});
							}}
							key={company.id}
							className={`company ${
								isSelectedCompany(company) ? 'selected' : ''
							}`}>
							<CompanyCard
								{...company}
								isSelected={isSelectedCompany(company)}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default CompanyIndexView;
