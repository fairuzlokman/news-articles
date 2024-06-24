"use client";
import { getEverything, getHeadlines } from "@/services/news";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { testData } from "./test_data";
import dateFormatter from "@/helper/dateFormatter";
import getRelativeTime from "@/helper/getRelativeTime";

const searchSuggestions = [
	"Sports",
	"Tech",
	"Games",
	"Arts",
	"Economy",
	"Cooking",
	"Lifestyle",
	"Business",
	"Politics",
];

export default function Home() {
	const router = useRouter();
	// const { data } = useQuery({
	// 	queryKey: ["everything"],
	// 	queryFn: getEverything,
	// });

	// const { data, isPending } = useQuery({
	// 	queryKey: ["headlines"],
	// 	queryFn: getHeadlines,
	// });

	const isPending = false;

	if (isPending) return <p>Loading...</p>;

	const [heroData, ...remainingData] = testData.articles;

	return (
		<div className="relative bg-cover bg-default-image">
			<div className="absolute w-screen h-screen bg-black/30" />
			<div className="relative z-50 flex items-center justify-between px-8 py-3 bg-white shadow-md">
				<i>The Old Newspaper</i>
				<div className="flex gap-8">
					{searchSuggestions.map((item, index) => (
						<p key={index} className="text-sm">
							{item}
						</p>
					))}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="size-5"
					>
						<path
							fillRule="evenodd"
							d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>
			<div className="max-w-[1280px] z-10 relative m-auto grid h-[calc(100vh-48px)] grid-cols-4">
				<Link
					href={heroData.url}
					target="_blank"
					className="col-span-3 bg-white/60"
				>
					<div className="flex flex-col h-full justify-between px-[30px] pt-[30px] pb-[60px]">
						<div className="flex gap-2">
							<p>{heroData.author}</p>|
							<p>{dateFormatter(heroData.publishedAt)}</p>
						</div>
						<p className="text-5xl">{heroData.title}</p>
					</div>
				</Link>
				<div className="col-span-1 overflow-y-scroll bg-white">
					{...remainingData.map((item, index) => (
						<Link key={index} href={item.url} target="_blank">
							<div className="flex flex-col gap-1 p-6 border-b">
								<div className="flex gap-2 text-sm">
									<p>{item.author}</p>|
									<p className="text-black/40">
										{getRelativeTime(item.publishedAt)}
									</p>
								</div>
								<p className="truncate">{item.title}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
