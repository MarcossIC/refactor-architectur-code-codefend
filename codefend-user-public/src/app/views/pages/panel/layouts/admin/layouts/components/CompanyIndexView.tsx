import { defaultCompanyCardData } from '../../../../../../../data';
import React, { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import "./CompanyIndexView.scss";
import { SearchIcon } from '../../../../../../components';
import { useCompanyContext } from '../CompanyContext';


const CompanyIndexView: React.FC = () => {
	const {actions,  state} = useCompanyContext()
	const { searchQuery, companies} = state
	const {handleChange, handleClick, isSelectedCompany} = actions

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

	return (
		<>
			<div className="CompanyIndexView">
				{Boolean(companies.length) && (
					<div className="company-search relative">
						<input
							type="text"
							value={searchQuery}
							/* onChange={(e) =>
								setCompanyState((prevState) => ({
									...prevState,
									searchQuery: e.target.value,
								}))
							} */
							onChange={handleChange}
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
							/* onClick={() => {
								setCompanyState((prevState) => {
									if (isSelectedCompany(company)) {
										return { ...prevState, companyStore: null };
									} else {
										return { ...prevState, companyStore: company };
									}
								});
							}} */
							onClick={() => handleClick(company)}
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
