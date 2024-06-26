import { getYear } from "date-fns";
import api from "./api";

export const getEverything = async ({ page = 1, search }) => {
	const currentYear = getYear(new Date());
	const from = currentYear - 5;

	const response = await api.get("/everything", {
		params: {
			pageSize: 10,
			page: page,
			q: search,
			from: from,
			to: currentYear,
		},
	});
	return { ...response.data, nextPage: page + 1 };
};

export const getHeadlines = async ({ page = 1 }) => {
	const response = await api.get(`/top-headlines`, {
		params: {
			pageSize: 10,
			page: page,
			country: "my",
		},
	});
	return { ...response.data, nextPage: page + 1 };
};
