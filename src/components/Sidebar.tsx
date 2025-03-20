

export const SideBar = () => {
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
				<a href="">Clients</a>
				<a href="">Returns</a>
			</section>
		</div>
	)	
}