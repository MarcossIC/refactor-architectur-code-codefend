import { fetchPOST } from '..';

const getAll = async (companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'issues/index',
			company_id: companyID,
			resource_address_domain: 'clarin.com',
		},
	});

	return data;
};

export const IssueService = {
	getAll,
};
