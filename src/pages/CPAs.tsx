import axios, { AxiosHeaders } from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { ClientForm } from "../components/client/ClientForm";
import { PageContext } from "./Frame";
import { Cpa } from "../models/Cpa";

export const Cpas = () => {

	const [_,setActivePage] = useContext(PageContext);
	const [cpas, setCpas] = useState([]);
	const [selectedCpa, setSelectedCpa] = useState(null);
	const [show, setShow] = useState(false);

	// Get all clients
	useEffect(() => {
		getAllCpas();
		setActivePage("Cpas")
	},[])

	const getAllCpas = async () => {
		let headers = new AxiosHeaders();

		await axios.get('http://localhost:8080/cpa', {headers: headers})
		.then(response => {
			setCpas(
				response.data.map((cpa: Cpa) => {
					return new Cpa(cpa);
				})
			)
		});
	}

	// updates
	const updateCpa = async (cpa: Cpa) => {
		let headers = new AxiosHeaders();

		await axios.put(`http://localhost:8080/cpa/${cpa.id}`, cpa, {headers: headers})
		.then(response => {
			let savedCpa = new Cpa(response.data);
			setCpas((prevCpas) => prevCpas.map((cpa: Cpa) => cpa.id == savedCpa.id ? savedCpa : cpa));
			setShow(!show);
		}).catch(() => "Something went wrong");
	}

	// deletes
	const deleteCpa = async (id: number) => {
		let headers = new AxiosHeaders();

		await axios.delete(`http://localhost:8080/cpa/${id}`, {headers: headers})
		.then(response => {
			if (response.status === 204) {
				setCpas((prevCpas) => prevCpas.filter((cpa: Cpa) => cpa.id != id ? cpa : null));
			}
		}).catch(() => "Something went wrong");
	}

	// modal management
	const showModal = (cpa: Cpa) => {
		setSelectedCpa(cpa);
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
					<th>Email</th>
					<th>Capacity</th>
					<th>Assigned Returns</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{
					cpas.map((cpa: Cpa) => {
						return (
							<tr key={cpa.id}>
								<td> { cpa.id } </td>
								<td> { `${cpa.firstName} ${cpa.lastName}` } </td>
								<td> { cpa.email } </td>
								<td> %%% </td>
								<td> 000000 </td>
								<td style={{textAlign: "center", display: "flex", justifyContent: "space-evenly"}}>
									<Button size="sm" variant="danger" onClick={() => deleteCpa(cpa.id)}>
										Delete
									</Button>
									<Button size="sm" variant="primary" onClick={() => showModal(cpa)}>
										Edit
									</Button>
								</td>
							</tr>
						)
					})
				}
				
			</tbody>
		</Table>

		{
			selectedCpa &&

			<Modal show={show} onHide={hideModal} key={`cl_${selectedCpa.id}`}>
				<Modal.Header closeButton>
				<Modal.Title>
					{ `${selectedCpa?.firstName} ${selectedCpa.middleName ? selectedCpa.middleName : ""} ${selectedCpa?.lastName}` }
				</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ClientForm client={selectedCpa} update={updateCpa} isClient={false} />
				</Modal.Body>
			</Modal>
		}

	</section>
	)
}