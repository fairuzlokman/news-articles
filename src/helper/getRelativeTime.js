import { formatDistanceToNow } from "date-fns";

const getRelativeTime = (dateString) => {
	if (dateString) {
		return formatDistanceToNow(dateString, { addSuffix: true });
	}
};

export default getRelativeTime;
