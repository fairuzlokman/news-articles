import api from "./api";

export const getEverything = async (keyword) => {
	const response = await api.get(`/everything?q=${keyword}`);
	return response.data;
};

export const getHeadlines = async () => {
	const response = await api.get(`/top-headlines?country=my`);
	return response.data;
};
