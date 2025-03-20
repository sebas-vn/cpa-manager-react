import axios, { AxiosHeaders } from "axios";
import { Client } from "../models/Client";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { ClientForm } from "../components/ClientForm";

export const Clients = () => {

	const [clients, setClients] = useState([]);
	const [selectedClient, setSelectedClient] = useState(null);
	const [show, setShow] = useState(false);

	useEffect(() => {
		getAllClients();
	},[])

	const getAllClients = async () => {
		let headers = new AxiosHeaders();

		await axios.get('http://localhost:8080/client', {headers: headers})
		.then(response => {
			setClients(
				response.data.map((client: Client) => {
					return new Client(client);
				})
			)
		});
	}

	const updateClient = async () => {

	}

	const showModal = (client: Client) => {
		setSelectedClient(client);
		setShow(!show);
	}

	const hideModal = () => setShow(!show);


	return (
		<section style={{overflow: "auto"}}>
		<Table bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>email</th>
					<th>Mobile Number</th>
					<th>Home Number</th>
					<th>EIN</th>
				</tr>
			</thead>
			<tbody>
				{
					clients.map((client: Client) => {
						return (
							<>
								<tr onClick={() => showModal(client)} key={client.id}>
									<td> { client.id } </td>
									<td> { `${client.firstName} ${client.lastName}` } </td>
									<td> { client.email } </td>
									<td> { client.mobileNumber } </td>
									<td> { client.homeNumber } </td>
									<td> { client.ein } </td>
								</tr>
							</>
						)
					})
				}
				
			</tbody>
		</Table>

		{
			selectedClient &&

			<Modal show={show} onHide={hideModal} key={`cl_${selectedClient.id}`}>
				<Modal.Header closeButton>
				<Modal.Title>{ `${selectedClient?.firstName} ${selectedClient.middleName ? selectedClient.middleName : ""} ${selectedClient?.lastName}` }
					
				</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ClientForm client={selectedClient} />
				</Modal.Body>
				<Modal.Footer>
				<Button variant="secondary" onClick={hideModal}>
					Close
				</Button>
				<Button variant="primary" onClick={updateClient}>
					Save Changes
				</Button>
				</Modal.Footer>
			</Modal>
		}

	</section>
	)
}