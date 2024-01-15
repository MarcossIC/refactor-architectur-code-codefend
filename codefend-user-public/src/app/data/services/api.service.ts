import axios from 'axios';
import { fetchGET } from '.';
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

	initializeIntelData: async(data: any[], companyID: string) => {
    return fetchGET({
        params: {
            model: "offensive/inx",
            ac: "get_id",
            company_id: companyID
        },
        body: data
    })
    .then((res: any) => {
      return JSON.parse(res.data);
    })
    .catch((err: any) => {
      console.log(err);
    })
  },

	initializeSnsData: async(data:any, companyID: string) => {
    return fetchGET({
        params: {
            model: "offensive/sns",
            ac: "search",
            company_id: companyID,
            ...data
        }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
