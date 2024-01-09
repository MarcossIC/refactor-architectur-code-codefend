import { User } from '.';

export interface Company {
	id: string;
	name: string;
	web: string;
	country: string;
	size: string;
	market: string;
	countryCode: string;
	countryProvince: string;
	countryCity: string;
	address: string;

	ownerName: string;
	ownerLastname: string;
	ownerRole: string;
	ownerEmail: string;
	ownerPhone: string;
	profileMedia: string;
	orderSize: string;
	isDisabled: boolean;
	createdAt: string;
}

export interface Resouce {
	id: string;
	companyID: string;
	resourceDomain: string;
	resourceDomainDad: string;
	servers: string;
	mainServer: string;
	serverCountry: string;
	serverCountryCode: string;
	serverCountryProvince: string;
	serverCountryCity: string;
	isDisabled: boolean;
	createdAt: string;
}

export interface Webresources extends Resouce {
	childs: Resouce[];
}

export interface CompanyResource {
	web: string | number;
	mobile: string | number;
	cloud: string | number;
	lan: string | number;
	source: string | number;
	social: string | number;
}
export interface IssuesShare {
	total: string | number;
	critical: string | number;
	elevated: string | number;
	medium: string | number;
	low: string | number;
}
export interface IssuesCondition {
	total: string | number;
	fixed: string | number;
	open: string | number;
}

export interface CompanyMember {
	id: string;
	companyID: string;
	name: string;
	lastName: string;
	companyRole: string;
	email: string;
	phone: string;
	profileMedia: string;
	country: string;
	countryCode: string;
	countryProvince: string;
	countryCity: string;
	isDisabled: boolean;
	createdAt: string;
}

export interface Issues {
	id: string;
	companyID: string;
	resourceClass: string;
	resourceID: string;
	researcherID: string;
	researcherUsername: string;
	riskLevel: string;
	riskScore: string;
	name: string;
	condition: string;
	price: string;
	pricePaid: string;
	isDisabled: string;
	createdAt: string;
}

export interface DashboardProps {
	company: Company;
	issues: Issues[];
	members: CompanyMember[];
	resources: CompanyResource;
	issuesShare: IssuesShare;
	issuesCondicion: IssuesCondition;
}

export interface WebapplicationProps {
	company: Company;
	resources: Webresources[];
}

export interface MobileProps {
	disponibles: any;
}

/* 
{
    "error": "0",
    "disponibles": null,
    "info": "Transacción sin problemas."
}
*/
