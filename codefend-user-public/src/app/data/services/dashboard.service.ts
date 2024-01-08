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

const renderPercentage = (value: string, total: string) => {
	if (value === '0') {
		return '0%';
	}
	let percentValue =
		((parseInt(value) / parseInt(total)) * 100).toFixed() + '%';

	return percentValue;
};

export const DashboardService = {
	getCompanyInfo,
	renderPercentage,
};
