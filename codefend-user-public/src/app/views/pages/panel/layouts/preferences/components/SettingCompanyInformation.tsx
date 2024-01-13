import { useCompany } from '../../../../../../data/hooks/useCompany';
import React from 'react';

interface CompanyDataProps {
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

	const getCompanyData = (props: CompanyInfo) => {
		return {
			name: props.name,
			web: props.web,
			mercado: props.mercado,
			owner: `${props.owner_fname} ${props.owner_lname}`,
			email: props.owner_email,
			location: props.pais_provincia,
			address: `${props.address === 'non available' ? '-' : props.address}`,
		};
	};

	return (
		<>
			<div className="w-full internal-tables">
				<div className="py-3 px-5 internal-tables-active flex flex-row items-center gap-x-6 ">
					<p className="text-small text-left font-bold title-format">
						COMPANY INFORMATION
					</p>
					<p className="text-small text-left font-bold title-format border-x-[1.5px]  title-format px-6 underline cursor-pointer codefend-text-red">
						UPDATE
					</p>
				</div>
				<div className="flex px-8 py-2">
					<div className="w-full">
						{/* <div className="flex p-3 text-format">
              <section className="flex w-full">
                <p className="text-base w-2/4">name</p>
                <p className="text-base w-2/4">hemsleek</p>
              </section>
            </div> */}

						{Object.entries(getCompanyData(companyInfo!)).map((data, index) => (
							<div key={index} className="flex px-3 py-1 text-format">
								<section className="flex w-full items-center">
									<p className="w-2/4">{data[0]}</p>
									<p className="text-base w-2/4">{data[1]}</p>
								</section>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default SettingCompanyInformation;
