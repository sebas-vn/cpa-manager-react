import { Link } from "react-router"


export const SideBar = () => {

	const links = [
		{ linkName: "Clients", linkDestination: "/clients" },
		{ linkName: "Returns", linkDestination: "/returns" },
		{ linkName: "Categories", linkDestination: "/categories" },
		{ linkName: "CPAs", linkDestination: "/cpas" },
	]

	return (
		<div className="sidebar">
			<section className="recent-tasks">
				<h3>Recent tasks</h3>
				<ul>
					<li>Item 1</li>
					<li>Item 2</li>
					<li>Item 3</li>			
				</ul>
			</section>
			<hr />
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