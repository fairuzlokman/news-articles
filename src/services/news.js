import api from "./api";

export const getEverything = async () => {
	const response = await api.get(`/everything?q=apple`);
	return response.data;
};

export const getHeadlines = async () => {
	const response = await api.get(`/top-headlines?country=my`);
	return response.data;
};
