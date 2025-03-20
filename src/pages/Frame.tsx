import { createContext, useState } from "react";
import { Outlet } from "react-router";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";


export const Frame = () => {

	const [selectedTaxReturn, setSelectedTaxReturn] = useState();
	
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