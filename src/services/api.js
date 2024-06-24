import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		// "Access-Control-Allow-Origin": "*",
		// "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		"Content-Type": "application/json",
		Authorization: process.env.NEXT_PUBLIC_API_KEY,
	},
});

export default api;
