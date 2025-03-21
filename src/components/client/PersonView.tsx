import { Row, Container, Col } from "react-bootstrap"
import { Client } from "../../models/Client"
import { Cpa } from "../../models/Cpa"

type PersonViewProps = {
	person: Cpa|Client
}

export const PersonView = ({person}: PersonViewProps) => {
	return (
		<Container>
			<Row>
				<Col>First Name: {person.firstName}</Col>
				<Col>Middle Name: {person.middleName ? person.middleName : ""}</Col>
				<Col>Last Name: {person.lastName}</Col>
			</Row>
			<hr />
			<Row>
				<Col>Email: {person.email}</Col>
			</Row>
			<hr />
			<Row>
				<Col>Mobile Number: {person.mobileNumber ? person.mobileNumber : ""}</Col>
				<Col>Home Number: {person?.homeNumber}</Col>
			</Row>
			<hr />
			<Row>
				<Col>EIN: {person.ein ? person.mobileNumber : ""}</Col>
			</Row>
		</Container>
	)
}