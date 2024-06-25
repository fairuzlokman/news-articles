import React from "react";
import Header from "./Header";
import { Oval } from "react-loader-spinner";

const LoadingState = () => {
	return (
		<div className="h-screen bg-cover bg-default-image">
			<Header />
			<div className="h-[calc(100vh-56px)] bg-black/30 flex items-center justify-center">
				<Oval color="white" secondaryColor="white" />
			</div>
		</div>
	);
};

export default LoadingState;
