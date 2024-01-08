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

export interface Webresources {
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
	childs: {
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
	}[];
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

export interface DashboardProps {
	company: Company;
	issues: {} | null;
	members: CompanyMember[];
	resources: CompanyResource;
	issuesShare: IssuesShare;
	issuesCondicion: IssuesCondition;
}

export interface WebapplicationProps {
	company: Company;
	resources: Webresources[];
}

/* 
{
{
    "company": {
        "id": "118",
        "name": "MarcosCompany",
        "web": "marcosic.netlify.app",
        "mercado": "Argentina",
        "size": "1",
        "pais": "Argentina",
        "pais_code": "AR",
        "pais_provincia": "Buenos Aires",
        "pais_ciudad": "Florentino Ameghino",
        "address": "",
        "owner_fname": "Marcos",
        "owner_lname": "Lopez",
        "owner_role": "Web Developers",
        "owner_email": "lopezikaro16@gmail.com",
        "owner_phone": "3757588790",
        "profile_media": "",
        "orders_size": "1500 \/ 15000 \/ 4500 \/ 45000 \/ 13500 \/ 135000",
        "eliminado": "0",
        "creacion": "2023-12-28 19:34:38"
    },
    "resources": [
        {
            "id": "1524",
            "company_id": "118",
            "resource_domain": "marcosic.netlify.app",
            "resource_domain_dad": "",
            "servers": "54.232.109.9, 52.67.97.86",
            "main_server": "54.232.109.9",
            "server_pais": "Brazil",
            "server_pais_code": "BR",
            "server_pais_provincia": "Sao Paulo",
            "server_pais_ciudad": "Sao Paulo",
            "eliminado": "0",
            "creacion": "2023-12-28 19:34:38",
            "childs": [
                {
                    "id": "1525",
                    "company_id": "118",
                    "resource_domain": "API count exceeded - Increase Quota with Membership",
                    "resource_domain_dad": "1524",
                    "servers": "",
                    "main_server": "",
                    "server_pais": "",
                    "server_pais_code": "",
                    "server_pais_provincia": "",
                    "server_pais_ciudad": "",
                    "eliminado": "0",
                    "creacion": "2023-12-28 19:34:52"
                }
            ]
        }
    ]
}

*/
