import { useCallback, useEffect, useState } from 'react';
import { User, companyServices, useAuthState } from '..';

interface CompanyInfo {
  name: string;
  web: string;
  mercado: string;
  owner_fname: string;
  owner_lname: string;
  owner_email: string;
  pais_provincia: string;
  address: string;
} 

const getCompanyInfo = async (companyID: string) => {
  const response = await companyServices.getAll(companyID);
  const data = await response.json();
  return data;
};

export const useCompany = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getUserdata } = useAuthState();

  const fetchCompanyInfo = useCallback(async () => {
    const user = getUserdata() as User;
    const companyID = user?.companyID;
    try {
      const data = await getCompanyInfo(companyID);
      setCompanyInfo(data);
    } catch (error) {
      console.error('Error al obtener información de la empresa:', error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  }, [getUserdata]);

  useEffect(() => {
    fetchCompanyInfo();
  }, [fetchCompanyInfo]);

  return { companyInfo, isLoading, error };
};
