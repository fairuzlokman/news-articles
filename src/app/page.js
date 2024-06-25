"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getHeadlines } from "@/services/news";
import Link from "next/link";
import { topHeadlinesData } from "./top_headlines_data";
import dateFormatter from "@/helper/dateFormatter";
import getRelativeTime from "@/helper/getRelativeTime";
import Image from "next/image";
import Header from "@/components/Header";

export default function Home() {
	// const { data, isPending, fetchNextPage, isFetchingNextPage } =
	// 	useInfiniteQuery({
	// 		queryKey: ["headlines"],
	// 		queryFn: ({ pageParam = 1 }) => getHeadlines({ page: pageParam }),
	// 		getNextPageParam: (lastPage) => {
	// 			const totalPages = Math.ceil(lastPage.totalResults / 10);
	// 			if (lastPage.nextPage - 1 < totalPages) {
	// 				return lastPage.nextPage;
	// 			}
	// 		},
	// 	});

	const isPending = true;

	if (isPending) return <p>Loading...</p>;

	const hasNextPage = !data.pageParams.includes(false);

	const articles = data.pages.reduce((acc, page) => {
		return [...acc, ...page.articles];
	}, []);

	const [mainArticle, ...remainingArticles] = articles;

	return (
		<div className="relative bg-cover bg-default-image">
			<div className="absolute w-full h-screen bg-black/30" />
			<Header />
			<div className="max-w-[1280px] z-10 relative m-auto grid h-[calc(100vh-56px)] grid-cols-5">
				<Link
					href={mainArticle.url}
					target="_blank"
					className="col-span-3 bg-white/85 group"
				>
					<div className="flex flex-col h-full p-[30px]">
						<div className="flex items-center justify-between">
							<div className="flex gap-2">
								<p>
									{mainArticle.author ??
										mainArticle.source.name}
								</p>
								|
								<p className="text-black/50">
									{dateFormatter(mainArticle.publishedAt)}
								</p>
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="transition-all size-5 group-hover:-mt-1 group-hover:-mr-1"
							>
								<path
									fillRule="evenodd"
									d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="w-full h-[45vh] mt-5 mb-[30px] rounded-[4.5px] overflow-clip">
							{mainArticle.urlToImage ? (
								<Image
									src={mainArticle.urlToImage}
									alt={`${mainArticle.title} image`}
									width={500}
									height={500}
									className="object-cover w-full h-full"
								/>
							) : (
								<div className="flex items-center justify-center w-full h-full gap-2 text-xl text-white bg-fixed bg-cover bg-default-image">
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
						</div>
						<div className="space-y-2">
							<p className="text-xl font-semibold line-clamp-3">
								{mainArticle.title}
							</p>
							<p className="line-clamp-4">
								{mainArticle.description}
							</p>
						</div>
					</div>
				</Link>
				<div className="col-span-2 overflow-y-scroll bg-white">
					{...remainingArticles.map((item, index) => (
						<Link key={index} href={item.url} target="_blank">
							<div className="flex flex-col gap-2 p-6 transition-all border-b group hover:bg-black/5">
								<div className="flex gap-2 text-sm">
									<p>{item.author ?? item.source.name}</p>|
									<p className="text-black/50">
										{getRelativeTime(item.publishedAt)}
									</p>
								</div>
								{item.urlToImage && (
									<div className="w-full aspect-video">
										<Image
											src={item.urlToImage}
											alt={`${item.title} image`}
											width={500}
											height={500}
											className="object-cover w-full h-full rounded-[4.5px]"
										/>
									</div>
								)}
								<p className="font-semibold truncate">
									{item.title}
								</p>
								<p className="text-sm text-blue-600 group-hover:underline underline-offset-2">
									Read more...
								</p>
							</div>
						</Link>
					))}
					{hasNextPage && (
						<div className="p-2">
							<button
								onClick={fetchNextPage}
								className="w-full py-2 text-sm font-semibold text-white transition-all bg-blue-600 rounded-full hover:bg-blue-500"
							>
								{isFetchingNextPage
									? "Loading..."
									: "Load more"}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
