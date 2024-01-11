import axios from 'axios';
import { useAuthState } from '..';
var host = import.meta.env.VITE_SERVER_HOST;

export const ApiHandlers = {
	getPanelCompanies: async () => {
		return axios({
			method: 'get',
			url: host + '/v1/approval/getcompanies',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then((companies) => {
				return companies;
			})
			.catch(() => {
				return false;
			});
	},

	createCompanyHandler: async (data: any) => {
		return axios({
			method: 'post',
			url: host + '/v1/approval/createCompany',
			data: data,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then(() => {
				return true;
			})
			.catch(() => {
				return false;
			});
	},
};
