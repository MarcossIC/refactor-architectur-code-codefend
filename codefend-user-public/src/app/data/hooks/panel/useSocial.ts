import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from '..';
import { SocialAplicationService } from '../../../data';

export interface SocialRoles {
	total: string;
	administrative: string;
	customer_service: string;
	finance: string;
	human_resources: string;
	information_tech: string;
	marketing: string;
	production_operations: string;
	sales: string;
	strategy_planning: string;
}

export interface Member {
	id: string;
	company_id: string;
	member_fname: string;
	member_lname: string;
	member_email: string;
	member_phone: string;
	member_role: string;
	eliminado: string;
	creacion: string;
}

interface SocialData {
	disponibles: Member[];
	eliminados: Member[];
	error: string;
	info: string;
	resources_social_roles: SocialRoles;
}

export const useSocial = () => {
  const { getUserdata } = useAuthState();
  const [loading, setLoading] = useState<boolean>(false);
	const [members, setMembers] = useState<Member[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [info, setInfo] = useState<string | null>(null);


  const fetchSocial = useCallback(() => {
    const user = getUserdata();
		const companyID = user?.companyID;
		setLoading(true);

    SocialAplicationService.getAll(companyID)
    .then((response: SocialData) => {
      setMembers(response.disponibles)
      setInfo(info)
    })
    .catch((error: SocialData) => {
      setError(error.error)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [getUserdata])

 useEffect(() => {
  fetchSocial()
 }, [])

 const refetch = useCallback(() => fetchSocial(), []);

  return { members, loading, error, info, refetch };
};
