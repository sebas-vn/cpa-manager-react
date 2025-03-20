import { Tab, Tabs, Form, InputGroup, Row, Col } from "react-bootstrap"
import { Client } from "../models/Client";

type ClientFormProps = {
	client: Client;
}

export const ClientForm = ({client}: ClientFormProps) => {

	return (
		<Form>
			<Form.Group as={Row}>
				<Col sm="1" md="4" lg="4">
					<Form.Label>First Name</Form.Label>
					<Form.Control type="text" defaultValue={client.firstName}/>
				</Col>
				<Col sm="1" md="4" lg="4">
					<Form.Label>Middle Name</Form.Label>
					<Form.Control type="text" defaultValue={client.middleName}/>
				</Col>
				<Col sm="1" md="4" lg="4">
					<Form.Label>Last Name</Form.Label>
					<Form.Control type="text" defaultValue={client.lastName}/>
				</Col>
			</Form.Group>
			<hr />
			<Form.Group as={Row}>
				<Form.Label>Email Address</Form.Label>
				<Form.Control type="text" defaultValue={client.email}/>
			</Form.Group>
			<hr />
			<Form.Group as={Row}>
			<Col sm="1" md="6" lg="6">
					<Form.Label>Mobiel Number</Form.Label>
					<Form.Control type="text" defaultValue={client.mobileNumber}/>
				</Col>
				<Col sm="1" md="6" lg="6">
					<Form.Label>Home Number</Form.Label>
					<Form.Control type="text" defaultValue={client.homeNumber}/>
				</Col>
			</Form.Group>
			<hr />
			<Form.Group as={Row}>
				<Col sm="1" md="6" lg="6">
					<Form.Label>SSN</Form.Label>
					<Form.Control type="text" defaultValue={client.ssn}/>
				</Col>
				<Col sm="1" md="6" lg="6">
					<Form.Label>EIN</Form.Label>
					<Form.Control type="text" defaultValue={client.ein}/>
				</Col>
			</Form.Group>
		</Form>
	)
}