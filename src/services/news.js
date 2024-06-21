import api from "./api";

export const getEverything = async () => {
	const response = await api.get(`/everything`);
	return response.data;
};

export const getTopHeadlines = async () => {
	const response = await api.get(`/top-headlines`);
	return response.data;
};
