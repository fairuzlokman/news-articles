import Link from "next/link";
import React from "react";

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
	return (
		<div className="relative z-50 flex items-center justify-between px-[30px] py-4 bg-white shadow-md">
			<Link href={"/"}>
				<i>The Old Newspaper</i>
			</Link>
			<div className="flex gap-[30px]">
				{searchSuggestions.map((item, index) => (
					<Link
						key={index}
						href={item.toLowerCase()}
						className="text-sm cursor-pointer hover:underline hover:underline-offset-2"
					>
						{item}
					</Link>
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
	);
};

export default Header;
