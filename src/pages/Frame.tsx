import { createContext, useState } from "react";
import { Outlet } from "react-router";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";

export const PageContext = createContext([]);

export const Frame = () => {

	const [activePage, setActivePage] = useState("");
	
	return (
		<div className="frame">
			<PageContext.Provider value={[activePage, setActivePage]}>
				<Header />
				
				<main id="main-frame">
					<SideBar />
					<Outlet />
				</main>

				<Footer />
			</PageContext.Provider>
		</div>
	);
}