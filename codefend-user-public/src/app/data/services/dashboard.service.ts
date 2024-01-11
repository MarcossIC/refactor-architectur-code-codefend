import { fetchPOST } from './fetchAPI';

const getCompanyInfo = async (companyId: string | number) => {
	const { data } = await fetchPOST({
		params: {
			model: 'companies/dashboard',
			company_id: companyId,
		},
	});

	return data;
};

export const DashboardService = {
	getCompanyInfo,
};
