"use client";
import React from "react";
import Header from "@/components/Header";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getEverything } from "@/services/news";
import Link from "next/link";
import dateFormatter from "@/helper/dateFormatter";
import Image from "next/image";
import LoadingState from "@/components/LoadingState";

const Page = ({ params }) => {
	const search = decodeURIComponent(params.search);

	const { data, isPending, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ["everything", search],
			queryFn: ({ pageParam = 1 }) =>
				getEverything({ page: pageParam, search }),
			getNextPageParam: (lastPage) => {
				const totalPages = Math.ceil(lastPage.totalResults / 10);
				if (lastPage.nextPage - 1 < totalPages) {
					return lastPage.nextPage;
				} else return false;
			},
		});

	if (isPending) return <LoadingState />;

	const hasNextPage = !data.pageParams.includes(false);

	const articles = data.pages.reduce((acc, page) => {
		return [...acc, ...page.articles];
	}, []);

	return (
		<div className="relative bg-fixed bg-cover bg-default-image">
			<div className="absolute w-full h-full bg-black/30" />
			<Header />
			<div className="overflow-y-scroll h-[calc(100vh-56px)] relative z-10">
				<div className="max-w-[1280px] px-5 pb-5 flex flex-col gap-1 m-auto relative">
					<div className="px-6 py-3 bg-white">
						<p>
							<span className="font-semibold">Search:</span>{" "}
							{search}
						</p>
					</div>
					{articles.map((item, index) => (
						<Link key={index} href={item.url} target="_blank">
							<div className="bg-white/85 rounded-[4.5px]">
								<div className="flex gap-6 p-6 transition-all hover:bg-black/5 group">
									<div>
										<div className="h-[200px] w-[350px]">
											{item.urlToImage ? (
												<Image
													src={item.urlToImage}
													alt={`${item.title} image`}
													width={500}
													height={500}
													className="object-cover w-full h-full rounded-[4.5px]"
												/>
											) : (
												<div className="flex items-center justify-center w-full h-full gap-2 text-white bg-fixed bg-cover bg-default-image">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="currentColor"
														className="size-8"
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
									</div>
									<div className="flex flex-col w-full gap-2">
										<div className="flex justify-between">
											<div className="flex gap-2 text-sm">
												<p>
													{item.author ??
														item.source.name}
												</p>
												|
												<p className="text-black/50">
													{dateFormatter(
														item.publishedAt
													)}
												</p>
											</div>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												className="transition-all group-hover:-mr-1 size-5 group-hover:-mt-1"
											>
												<path
													fillRule="evenodd"
													d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<p className="text-xl font-semibold">
											{item.title}
										</p>
										<p className="line-clamp-4">
											{item.description}
										</p>
									</div>
								</div>
							</div>
						</Link>
					))}
					{hasNextPage && (
						<button
							onClick={fetchNextPage}
							className="py-2 text-sm font-semibold text-white transition-all bg-blue-600 rounded-full hover:bg-blue-500"
						>
							{isFetchingNextPage ? "Loading..." : "Load more"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Page;
