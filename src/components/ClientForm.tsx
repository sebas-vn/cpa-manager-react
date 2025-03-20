import { Form, Row, Col, Button } from "react-bootstrap"
import { Client } from "../models/Client";
import { useState } from "react";

type ClientFormProps = {
	client: Client;
	update: Function;
	isClient: boolean;
}

// conditional function that renders the rest of inputs if editing a CPA or Client
function AdditionalForm({formClient, isClient, handleChange}) {
	if (isClient) {
		return (
			<>
				<hr />
				<Form.Group as={Row}>
					<Col sm="1" md="6" lg="6">
						<Form.Label>Mobile Number</Form.Label>
						<Form.Control type="text" name="mobileNumber" defaultValue={formClient.mobileNumber} onChange={handleChange}/>
					</Col>
					<Col sm="1" md="6" lg="6">
						<Form.Label>Home Number</Form.Label>
						<Form.Control type="text" name="homeNumber" defaultValue={formClient.homeNumber} onChange={handleChange}/>
					</Col>
				</Form.Group>
				<hr />
				<Form.Group as={Row}>
					<Col sm="1" md="6" lg="6">
						<Form.Label>SSN</Form.Label>
						<Form.Control type="text" name="ssv" defaultValue={formClient.ssn} onChange={handleChange}/>
					</Col>
					<Col sm="1" md="6" lg="6">
						<Form.Label>EIN</Form.Label>
						<Form.Control type="text" name="ein" defaultValue={formClient.ein} onChange={handleChange}/>
					</Col>
				</Form.Group>
			</>
		)
	} else {
		return (
			<>
				<hr />
				<Form.Group>
					<Col sm="1" md="12" lg="12">
						<Form.Label>Amount Limit</Form.Label>
						<Form.Control type="text" name="mobileNumber" defaultValue={formClient.mobileNumber} onChange={handleChange}/>
					</Col>
				</Form.Group>
			</>
		)
	}
}

// forwarding ref to submit form from Clients page
export const ClientForm = ({client, update, isClient}: ClientFormProps) => {

	const [formClient, setFormClient] = useState(client);

	const handleChange = (e) => {
		setFormClient({ ...formClient, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		update(formClient);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group as={Row}>
				<Col sm="1" md="4" lg="4">
					<Form.Label>First Name</Form.Label>
					<Form.Control type="text" name="firstName" value={formClient.firstName} onChange={handleChange}/>
				</Col>
				<Col sm="1" md="4" lg="4">
					<Form.Label>Middle Name</Form.Label>
					<Form.Control type="text" name="middleName" defaultValue={formClient.middleName} 
					onChange={handleChange}/>
				</Col>
				<Col sm="1" md="4" lg="4">
					<Form.Label>Last Name</Form.Label>
					<Form.Control type="text" name="lastName" defaultValue={formClient.lastName} onChange={handleChange}/>
				</Col>
			</Form.Group>
			<hr />
			<Form.Group as={Row}>
				<Col sm="1" md="12" lg="12">
					<Form.Label>Email Address</Form.Label>
					<Form.Control type="text" name="email" defaultValue={formClient.email} onChange={handleChange}/>
				</Col>
			</Form.Group>
			<AdditionalForm formClient={formClient} isClient={isClient} handleChange={handleChange}/>
			<hr />
			<Button type="submit">
				Save
			</Button>
		</Form>
	)
};