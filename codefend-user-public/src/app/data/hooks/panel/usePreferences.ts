import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from '..';
import { PreferenceServices } from '../../services'
import { User } from 'app/data';

export interface CompanyInfo {
  id: string;
  name: string;
  web: string;
  mercado: string;
  size: string;
  pais: string;
  pais_code: string;
  pais_provincia: string;
  pais_ciudad: string;
  address: string;
  owner_fname: string;
  owner_lname: string;
  owner_role: string;
  owner_email: string;
  owner_phone: string;
  profile_media: string;
  orders_size: string;
  eliminado: string;
  creacion: string;
}

interface Issue {
  id: string;
  company_id: string;
  resource_class: string;
  resource_id: string;
  researcher_id: string;
  researcher_username: string;
  risk_level: string;
  risk_score: string;
  name: string;
  condicion: string;
  price: string;
  price_paid: string;
  eliminado: string;
  creacion: string;
}

interface Resources {
  web: string;
  mobile: string;
  cloud: string;
  lan: string;
  source: string;
  social: string;
}

interface Member {
  id: string;
  company_id: string;
  fname: string;
  lname: string;
  role: string;
  email: string;
  phone: string;
  profile_media: string;
  pais: string;
  pais_code: string;
  pais_provincia: string;
  pais_ciudad: string;
  eliminado: string;
  creacion: string;
}

interface IssuesShare {
  total: string;
  critical: string;
  elevated: string;
  medium: string;
  low: string;
  intel: string;
}

interface IssuesCondicion {
  total: string;
  fixed: string;
  open: string;
}

interface ApiResponse {
  response: string;
  company: CompanyInfo;
  issues: Issue[];
  resources: Resources;
  members: Member[];
  issues_share: IssuesShare;
  issues_condicion: IssuesCondicion;
}


export const usePreferences = () => {
    const { getUserdata } = useAuthState();

		const [loading, setLoading] = useState<boolean>(false);
		const [data, setData] = useState<CompanyInfo[]>([]);

		const fetchLan = useCallback(() => {
			const user = getUserdata() as User;
			const companyID = user?.companyID;
			setLoading(true);

			PreferenceServices.getAll(companyID)
				.then((response: ApiResponse) => {
					setData([response.company])
				})
				.finally(() => {
					setLoading(false)
				})
		}, [getUserdata])

		useEffect(() => {
			fetchLan();
		}, []);

		const refetch = useCallback(() => fetchLan(), []);

		return {loading, data, refetch}
}