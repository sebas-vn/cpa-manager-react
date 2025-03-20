import { Col, Container, Form, Row } from "react-bootstrap"
import { TaxReturn } from "../models/TaxReturn"

type returnFormProp = {
	taxReturn: TaxReturn
}

export const ReturnForm = ({taxReturn}: returnFormProp) => {

	return (
		<Container>
			<Form>
				<Form.Group as={Row}>
					<Col sm="1" md="12" lg="12">
						<Form.Select aria-label="Client select">
							<option>Select Client</option>
						</Form.Select>
					</Col>
				</Form.Group>
				<Row>
					<Col>
						<span>{taxReturn.client.firstName}</span>
					</Col>
					<Col>
						<span>{taxReturn.client.middleName}</span>
					</Col>
					<Col>
						<span>{taxReturn.client.lastName}</span>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						{taxReturn.client.email}
					</Col>
				</Row>
				<hr />
				<Row>
					<Col> {taxReturn.client.mobileNumber} </Col>
					<Col> {taxReturn.client.homeNumber} </Col>
				</Row>
				<hr />
				<Row>
					<Col> {taxReturn.client.ssn} </Col>
					<Col> {taxReturn.client.ein} </Col>
				</Row>
			</Form>
		</Container>
	)
}