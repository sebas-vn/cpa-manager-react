import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Outlet } from "react-router";
import { SideBar } from "../components/Sidebar";

export const Frame = () => {
	
	return (
		<div className="frame">
			<Header />
			
			<main id="main-frame">
				<SideBar />
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}