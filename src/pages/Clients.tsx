import axios, { AxiosHeaders } from "axios";
import { Client } from "../models/Client";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { ClientForm } from "../components/ClientForm";
import { PageContext } from "./Frame";

export const Clients = () => {

	const [_,setActivePage] = useContext(PageContext);
	const [clients, setClients] = useState([]);
	const [selectedClient, setSelectedClient] = useState(null);
	const [show, setShow] = useState(false);

	// Get all clients
	useEffect(() => {
		getAllClients();
		setActivePage("Clients")
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

	// updates
	const updateClient = async (client: Client) => {
		let headers = new AxiosHeaders();

		await axios.put(`http://localhost:8080/client/${client.id}`, client, {headers: headers})
		.then(response => {
			let savedClient = new Client(response.data);
			setClients((prevClients) => prevClients.map((client: Client) => client.id == savedClient.id ? savedClient : client));
			setShow(!show);
		}).catch(() => "Something went wrong");
	}

	// deletes
	const deleteClient = async (id: number) => {
		let headers = new AxiosHeaders();

		await axios.delete(`http://localhost:8080/client/${id}`, {headers: headers})
		.then(response => {
			if (response.status === 204) {
				setClients((prevClients) => prevClients.filter((client: Client) => client.id != id ? client : null));
			}
		}).catch(() => "Something went wrong");
	}

	// modal management
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
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{
					clients.map((client: Client) => {
						return (
							<>
								<tr key={client.id}>
									<td> { client.id } </td>
									<td> { `${client.firstName} ${client.lastName}` } </td>
									<td> { client.email } </td>
									<td> { client.mobileNumber } </td>
									<td> { client.homeNumber } </td>
									<td> { client.ein } </td>
									<td style={{textAlign: "center", display: "flex", justifyContent: "space-evenly"}}>
										<Button size="sm" variant="danger" onClick={() => deleteClient(client.id)}>
											Delete
										</Button>
										<Button size="sm" variant="primary" onClick={() => showModal(client)}>
											Edit
										</Button>
									</td>
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
				<Modal.Title>
					{ `${selectedClient?.firstName} ${selectedClient.middleName ? selectedClient.middleName : ""} ${selectedClient?.lastName}` }
				</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ClientForm client={selectedClient} update={updateClient} isClient={true}/>
				</Modal.Body>
			</Modal>
		}

	</section>
	)
}