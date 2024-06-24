import "./globals.css";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import ReactQueryClientProvider from "@/provider/ReactQueryClientProvider";

// const poppins = Poppins({
// 	subsets: ["latin"],
// 	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// 	display: "swap",
// });

const poppins = localFont({
	src: [
		{
			path: "../../public/font/Poppins-Regular.ttf",
			weight: "400",
			style: "normal",
		},
	],
});

export const metadata = {
	title: "The Old Newspaper",
	description:
		"Rediscover the charm of vintage newspapers with 'Old Newspaper' - your digital gateway to classic news stories and historical articles.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<ReactQueryClientProvider>{children}</ReactQueryClientProvider>
			</body>
		</html>
	);
}
