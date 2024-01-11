import { fetchPOST } from '.';

const getAll = async (companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/source',
			ac: 'view_all',
			company_id: companyID,
		},
	});

	return data;
};

const deleteSource = async (sourceId: String, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/source',
			ac: 'del',
			id: sourceId,
			company_id: companyID,
		},
	});

	return data;
};

/** Compute Source Code metrics for source code screen */
const computeSourceCodeMetrics = (sourceCode: any) => {
	if (!Array.isArray(sourceCode) || sourceCode.length === 0) return {};

	const metrics = sourceCode.reduce((acc, metric) => {
		const code = metric.sourceCode;
		if (acc[code]) {
			acc[code] += 1;
		} else {
			acc[code] = 1;
		}

		return acc;
	}, {});

	const total = Object.values(metrics).reduce(
		(acc: any, value: any) => value + acc,
		0,
	);
	return { total, ...metrics };
};

const add = async (params: any, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/source',
			ac: 'add',
			company_id: companyID,
			...params,
		},
	});

	return data;
};

const modify = async (sourceId: string, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/source',
			ac: 'mod',
			id: sourceId,
			company_id: companyID,
		},
	});

	return data;
};

export const SourceCodeService = {
	getAll,
	delete: deleteSource,
	computeSourceCodeMetrics,
	add,
	modify,
};
