import { fetchPOST } from '..';

const getAll = async (companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/cloud',
			ac: 'view_all',
			company_id: companyID,
		},
	});

	return data;
};

const getOne = async (cloudID: string, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/cloud',
			ac: 'view_one',
			id: cloudID,
			company_id: companyID,
		},
	});
};

const add = async (params: any, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/cloud',
			ac: 'add',
			company_id: companyID,
			...params,
		},
	});

	return data;
};

const modify = async (params: any, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resource/cloud',
			ac: 'mod',
			company_id: companyID,
		},
	});
};

const deleteApp = async (cloudId: string, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/cloud',
			ac: 'del',
			id: cloudId,
			company_id: companyID,
		},
	});

	return data;
};

export const CloudService = { getAll, getOne, add, modify, deleteApp };
