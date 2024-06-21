"use client";
import { getEverything, getHeadlines } from "@/services/news";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
	// const { data } = useQuery({
	// 	queryKey: ["everything"],
	// 	queryFn: getEverything,
	// });

	// const { data } = useQuery({
	// 	queryKey: ["headlines"],
	// 	queryFn: getHeadlines,
	// });

	return (
		<div>
			<p className="font-semibold text-9xl">News</p>
		</div>
	);
}
