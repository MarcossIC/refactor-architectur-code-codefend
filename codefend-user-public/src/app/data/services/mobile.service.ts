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

const getMobileByID = async (ID: string, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/mobile',
			ac: 'view_one',
			id: ID,
			company_id: companyID,
		},
	});

	return data;
};

const deleteApp = async () => {
	const { data } = await fetchPOST({});

	return data;
};

export const MobileService = {
	getAll,
	deleteApp,
	getMobileByID,
};
