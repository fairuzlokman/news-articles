"use client";
import { getEverything, getHeadlines } from "@/services/news";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { testData } from "./test_data";
import dateFormatter from "@/helper/dateFormatter";
import getRelativeTime from "@/helper/getRelativeTime";
import Image from "next/image";

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
			<div className="absolute w-full h-screen bg-black/30" />
			<div className="relative z-50 flex items-center justify-between px-[30px] py-4 bg-white shadow-md">
				<i>The Old Newspaper</i>
				<div className="flex gap-[30px]">
					{searchSuggestions.map((item, index) => (
						<p
							key={index}
							className="text-sm cursor-pointer hover:underline hover:underline-offset-2"
						>
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
			<div className="max-w-[1280px] z-10 relative m-auto grid h-[calc(100vh-56px)] grid-cols-4">
				<Link
					href={heroData.url}
					target="_blank"
					className="col-span-3 bg-white/60"
				>
					<div className="flex flex-col h-full p-[30px]">
						<div className="flex gap-2">
							<p>{heroData.author}</p>|
							<p>{dateFormatter(heroData.publishedAt)}</p>
						</div>
						{heroData.urlToImage ? (
							<Image
								src={heroData.urlToImage}
								alt={`${heroData.title} image`}
								width={500}
								height={500}
								className="object-cover w-full h-[45vh] mt-5 mb-[30px]"
							/>
						) : (
							<div className="h-[45vh] text-xl w-full flex gap-2 items-center justify-center bg-white mt-5 mb-[30px]">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="size-10"
								>
									<path
										fillRule="evenodd"
										d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
										clipRule="evenodd"
									/>
									<path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
								</svg>
								<i>The Old Newspaper</i>
							</div>
						)}
						<p className="text-3xl font-semibold lg:text-4xl line-clamp-3">
							{heroData.title}
						</p>
					</div>
				</Link>
				<div className="col-span-1 overflow-y-scroll bg-white">
					{...remainingData.map((item, index) => (
						<Link key={index} href={item.url} target="_blank">
							<div className="flex flex-col gap-2 p-6 border-b">
								<div className="flex gap-2 text-sm">
									<p>{item.author ?? item.source.name}</p>|
									<p className="text-black/40">
										{getRelativeTime(item.publishedAt)}
									</p>
								</div>
								{item.urlToImage && (
									<div className="h-[150px]">
										<Image
											src={item.urlToImage}
											alt={`${item.title} image`}
											width={500}
											height={500}
											className="object-cover w-full h-full"
										/>
									</div>
								)}
								<p className="font-semibold truncate">
									{item.title}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
