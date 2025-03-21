import axios, { AxiosHeaders } from "axios";
import { Client } from "../models/Client";
import { Cpa } from "../models/Cpa";

const API_URL = "http://localhost:8080";

export const apiService = {

	getAllClients: async () => {
		try {
			let headers = new AxiosHeaders();
			let response = await axios.get(`${API_URL}/client`, {headers: headers});
			return response.status == 200 ? Promise.resolve(response.data) : Promise.reject("Error fetching data");
		} catch (error) {
			console.error("API Error:", error);
			return null;
		}
	},

	getAllCPAs: async (): Promise<Cpa[]> => {
		try {
			let headers = new AxiosHeaders();
			let response = await axios.get(`${API_URL}/cpa`, {headers: headers})
			return response.status == 200 ? Promise.resolve(response.data) : Promise.reject("Error fetching data");
		} catch (error) {
			console.error("API Error:", error);
			return null;
		}
	},

	getAllReferenceData: async (): Promise<any> => {
		try {
			let headers = new AxiosHeaders();
			let response = await axios.get(`${API_URL}/reference`, {headers: headers})
			return response.status == 200 ? Promise.resolve(response.data) : Promise.reject("Error fetching data");
		} catch (error) {
			console.error("API Error:", error);
			return null;
		}
	},

	
}