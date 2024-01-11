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

const getOne = async (issueId: string, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'issues/view',
			issue_id: issueId,
			company_id: companyID,
		},
	});

	return data;
};

const addCSMessage = async (params: any, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'issues/cs',
			ac: 'add',
			company_id: companyID,
			...params,
		},
	});

	return data;
};

const add = async (params: any, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'issues/add',
			company_id: companyID,
			...params,
		},
	});

	return data;
};

const modify = async (params: any, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'issues/mod',
			resource_id: 1,
			company_id: companyID,
			resource_address_domain: 'clarin.com',
		},
		body: {
			...params,
		},
	});

	return data;
};

const deleteIssue = async (issueId: string, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'issues/del',
			company_id: companyID,
			id: issueId,
		},
	});

	return data;
};

export const IssueService = {
	getAll,
	delete: deleteIssue,
	modify,
	add,
	addCSMessage,
	getOne,
};
