import api from "./api";

export const getEverything = async (search) => {
	const response = await api.get(`/everything?q=${search}`);
	return response.data;
};

export const getHeadlines = async () => {
	const response = await api.get(`/top-headlines?country=my`);
	return response.data;
};
