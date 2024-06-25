"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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
	const inputRef = useRef(null);

	useEffect(() => {
		if (isSearching && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isSearching]);

	const handleOnChange = (e) => {
		setSearch(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (search.trim() !== "") {
			router.push(`/${search}`);
		} else {
			setIsSearching(!isSearching);
		}
	};

	return (
		<div className="relative z-50 flex items-center justify-between px-[30px] py-4 bg-white shadow-md">
			<Link href={"/"}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="size-6 sm:hidden"
				>
					<path
						fillRule="evenodd"
						d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
						clipRule="evenodd"
					/>
					<path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
				</svg>
				<i className="hidden sm:block">The Old Newspaper</i>
			</Link>
			{isSearching ? (
				<div className="absolute right-[30px] flex items-center gap-2">
					<form
						onSubmit={handleSubmit}
						className="flex items-center pr-3 border rounded-md border-black/50"
					>
						<Input
							value={search}
							onChange={handleOnChange}
							className="md:w-[300px] sm:w-[200px] w-[150px] text-sm"
							ref={inputRef}
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
					<div className="lg:flex gap-[30px] hidden">
						{searchSuggestions.map((item, index) => (
							<Link
								key={index}
								href={item}
								className="text-sm hover:underline hover:underline-offset-2"
							>
								{item}
							</Link>
						))}
					</div>
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
