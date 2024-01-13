import { useCompany } from '../../../../../../data/hooks/useCompany';
import React from 'react';

interface CompanyDataProps {
  companyInfo: any[]; // ¿Este prop se usa realmente? Puede ser innecesario si usas useCompany
}

const SettingCompanyInformation: React.FC<CompanyDataProps> = () => {
  const { companyInfo } = useCompany() || null;

  const getCompanyData = () => {
    if (!companyInfo) {
      return {
        name: '',
        web: '',
        mercado: '',
        owner: '',
        email: '',
        location: '',
        address: '',
      };
    }

    return {
      name: companyInfo.name,
      web: companyInfo.web,
      mercado: companyInfo.mercado,
      owner: `${companyInfo.owner_fname} ${companyInfo.owner_lname}`,
      email: companyInfo.owner_email,
      location: companyInfo.pais_provincia,
      address: `${companyInfo.address === 'non available' ? '-' : companyInfo.address}`,
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
            {Object.entries(getCompanyData()).map((data, index) => (
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
