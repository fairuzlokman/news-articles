"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

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

const Header = () => {
	const router = useRouter();
	const [isSearching, setIsSearching] = useState(false);
	const [search, setSearch] = useState("");

	const handleOnChange = (e) => {
		setSearch(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		router.push(`/${search}`);
	};

	return (
		<div className="relative z-50 flex items-center justify-between px-[30px] py-4 bg-white shadow-md">
			<Link href={"/"}>
				<i>The Old Newspaper</i>
			</Link>
			{isSearching ? (
				<div className="absolute right-[30px] flex items-center gap-2">
					<form
						onSubmit={handleSubmit}
						className="flex items-center pr-3 border rounded-md border-input"
					>
						<Input
							value={search}
							onChange={handleOnChange}
							className="w-[300px] text-sm"
						/>
						<button type="submit">
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
						</button>
					</form>
					<button onClick={() => setIsSearching(false)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="size-5"
						>
							<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
						</svg>
					</button>
				</div>
			) : (
				<div className="flex gap-[30px] transition-all">
					{searchSuggestions.map((item, index) => (
						<Link
							key={index}
							href={item.toLowerCase()}
							className="text-sm hover:underline hover:underline-offset-2"
						>
							{item}
						</Link>
					))}
					<button onClick={() => setIsSearching(true)}>
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
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
