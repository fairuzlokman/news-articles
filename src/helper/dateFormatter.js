import { format } from "date-fns";

const dateFormatter = (dateString) => {
	if (dateString) {
		return format(dateString, "d MMM yyyy, h:mm aaa");
	} else return null;
};

export default dateFormatter;
