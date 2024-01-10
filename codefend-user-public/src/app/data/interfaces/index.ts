export interface ID {
	id: string;
}
export interface CompanyID {
	companyID: string;
}

export interface Monitoring {
	isDisabled: boolean;
	createdAt: string;
}
export interface ResourceID extends ID, CompanyID {}

export * from './user';
export * from './panel';
export * from './auth';
