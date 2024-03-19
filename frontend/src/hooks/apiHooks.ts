import axios from "axios";

export interface ApiCall {
	route: string;
	data: object;
	method: apiMethod;
}
export type apiMethod = "GET" | "POST" | "PUT" | "DELETE";


const callAPI = async ({ route, method, data }: ApiCall) => {
	try {
		const response = await sendRequest({ route, method, data });
		if (!response) {
			return;
		}
		if (response.status === 200) {
			return response.data;
		}
		throw new Error(response.statusText);
	} catch (err) {
		console.log(err);
	}
};

const sendRequest = async ({ route, method, data }: ApiCall) => {
	switch (method) {
		case "GET": return await axios.get(route);
		case "POST":
			return await axios.post(route, data);
		case "PUT":
			return await axios.put(route, data);
		case "DELETE":
			return await axios.delete(route);
		default:
			return;
	}
}

export default callAPI;