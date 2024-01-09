import { Webresources } from '..';
import { fetchPOST } from './fetchAPI';

const get = async (companyID: string | number) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/web/index',
			childs: 'yes',
			resource_address_domain: 'clarin.com',
			company_id: companyID,
		},
	});

	return data;
};

const addResource = async (newResource: string, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/web/add',
			company_id: companyID,
			resource_address_domain: newResource,
		},
	});

	return data;
};

const deleteResource = async (resourceId: string, companyID: string) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/web/del',
			resource_id: resourceId,
			company_id: companyID,
		},
	});

	return data;
};

const addSubresource = async (
	id: string,
	resourceName: string,
	companyID: string,
) => {
	const { data } = await fetchPOST({
		params: {
			model: 'resources/web/add/child',
			company_id: companyID,
			resource_domain_dad: id,
			resource_address_domain: resourceName,
		},
	});

	return data;
};

/** Get resources  country locations and metric */
export const getCountryMetrics = (resources: Webresources[]) => {
	if (!resources) return [];

	const domainsAndSubDomains = resources
		.reduce((acc: any, resource: Webresources) => {
			return resource.childs === null ? acc : acc.concat(resource.childs);
		}, [])
		.concat(resources);

	//console.log('domainsAndSubDomains', { domainsAndSubDomains });

	const countries = domainsAndSubDomains.reduce((acc: any, value: any) => {
		if (!value.serverCountryCode || value.serverCountryCode === '-')
			return acc;
		if (acc[value.serverCountryCode]) {
			acc[value.serverCountryCode].count++;
			return acc;
		} else {
			acc[value.serverCountryCode] = {
				count: 1,
				country: value.serverCountryCode,
				countryCode: value.serverCountryCode,
				percentage: 1,
			};

			return acc;
		}
	}, {});

	//console.log('countries', { countries });

	const total = Object.keys(countries).reduce(
		(acc, value) => acc + countries[value].count,
		0,
	);

	//console.log('total', { total });

	const data = Object.keys(countries).map((countryKey: any) => {
		return {
			...countries[countryKey],
			percentage:
				Math.round((countries[countryKey].count / total) * 100 * 10) /
				10,
		};
	});

	//console.log('metrics', { data });
	return data;
};

export const getCompanyMetric = (resources: Webresources[], type: string) => {
	if (!resources) return '';

	if (type === 'domain') {
		return resources.length;
	} else if (type === 'subDomain') {
		return resources.reduce((acc: any, value: Webresources) => {
			return value.childs === null ? acc : value.childs.length + acc;
		}, 0);
	} else if (type === 'uniqueIp') {
		const domainsAndSubDomains = resources
			.reduce((acc: any, value: Webresources) => {
				return value.childs === null ? acc : acc.concat(value.childs);
			}, [])
			.concat(resources);

		return domainsAndSubDomains.filter(
			(resource: any, index: any, arr: any) => {
				return (
					arr.findIndex(
						(r: any) => r.mainServer === resource.mainServer,
					) === index
				);
			},
		).length;
	}

	return '';
};

export const WebApplicationService = {
	get,
	addResource,
	deleteResource,
	addSubresource,
	getCountryMetrics,
	getCompanyMetric,
};
