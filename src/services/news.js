import api from "./api";

export const getEverything = async (page, search) => {
	const response = await api.get("/everything", {
		params: {
			pageSize: 10,
			page: page,
			q: search,
		},
	});
	return response.data;
};

export const getHeadlines = async () => {
	const response = await api.get(`/top-headlines`, {
		params: {
			country: "my",
		},
	});
	return response.data;
};
