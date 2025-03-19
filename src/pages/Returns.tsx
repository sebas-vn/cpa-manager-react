import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Table } from "react-bootstrap";

import '../css/Returns.css';
import { useState } from "react";
import axios, { AxiosHeaders } from "axios";

export const Returns = () => {

	const clients = [1, 2, 3, 4, 5, 6];
	const [taxReturns, setTaxReturns] = useState([]);

	const getAllReturns = async () => {
		let headers = new AxiosHeaders();

		await axios.get('http://localhost:8080/', {headers: headers})
		.then(response => {
			setTaxReturns(
				response.data.map((ingredient: any) => {
					
				})
			)
		});
	}

	return (
		<main>
			{
				clients.map(e => {
					return (
						<Card style={{ width: '15rem', margin: '0px 3px' }} key={e}>
							<Card.Img variant="top" src="holder.js/100px180" />
							<Card.Body>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the
								bulk of the card's content.
							</Card.Text>
							<Button variant="primary">Go somewhere</Button>
							</Card.Body>
						</Card>


					)    
				})
			}

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Client</th>
						<th>Year</th>
						<th>Filing Type</th>
						<th>Complexity</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{
						
					}
				</tbody>
			</Table>
		</main>
	)
}	