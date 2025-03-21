import { Link } from "react-router"


export const SideBar = () => {

	const links = [
		{ linkName: "Clients", linkDestination: "/clients" },
		{ linkName: "Returns", linkDestination: "/returns" },
		{ linkName: "CPAs", linkDestination: "/cpas" },
	]

	return (
		<div className="sidebar">
			<section className="nav-sidebar">
				{ links.map(link => {
					return (
						<Link key={link.linkName.toLowerCase()} to={link.linkDestination} >
							{link.linkName}
						</Link>
					)
				})}
			</section>
		</div>
	)	
}