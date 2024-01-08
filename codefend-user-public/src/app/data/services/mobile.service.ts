import { fetchPOST } from './fetchAPI';

const getAll = async (companyID: string | number) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/mobile',
			ac: 'view_all',
			company_id: companyID,
		},
	});

	return data;
};

export const MobileService = {
	getAll,
};
