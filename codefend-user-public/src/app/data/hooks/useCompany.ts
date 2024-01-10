import { useState } from 'react';

export const  useCompany = ()  => {
  const [companyStore, setCompanyStore] = useState(null);

  return { companyStore, setCompanyStore };
}

export default useCompany;
