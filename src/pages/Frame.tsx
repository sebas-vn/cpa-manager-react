import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Outlet } from "react-router";

export const Frame = () => {
	
	return (
		<>
			<Header />
		
			<Outlet />

			<Footer />
		</>
	);
}