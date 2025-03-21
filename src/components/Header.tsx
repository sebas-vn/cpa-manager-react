import { useContext } from "react";
import { PageContext } from "../pages/Frame";
import { Button } from "react-bootstrap";

export const Header = () => {

	const [activePage] = useContext(PageContext);

	return (
		<header>
			<div className="name">
				<span>RTax Manager</span>
			</div>
			<div className="inner-header">
				<h4>{ activePage }</h4>

			</div>
		</header>
	);
}