import { Col, Container, Form, Row } from "react-bootstrap"
import { TaxAmount } from "../models/TaxAmount"

type TaxAmountFormProp = {
	taxAmounts: TaxAmount[]
}

export const TaxAmountForm = ({taxAmounts}: TaxAmountFormProp) => {

	return (
		<Container>
			<Form>
				<Form.Group as={Row}>
					<Col sm="1" md="6" lg="6">
						<Form.Label> Client </Form.Label>
						<Form.Select aria-label="client-select">
							<option>Select Client</option>
						</Form.Select>
					</Col>
					<Col md="6" lg="6">
						<Form.Label> CPA </Form.Label>
						<Form.Select aria-label="cpa-select">
							<option>Select CPA</option>
						</Form.Select>
					</Col>
				</Form.Group>
				<hr />
				<Form.Group as={Row}>
					<Col sm="1" md="4" lg="4">
						<Form.Label> Filing Type </Form.Label>
						<Form.Select aria-label="client-select">
							<option>Filing Type</option>
						</Form.Select>
					</Col>
					<Col md="4" lg="4">
						<Form.Label> Filing Type </Form.Label>
						<Form.Select aria-label="cpa-select">
							<option>Complexity</option>
						</Form.Select>
					</Col>
					<Col md="4" lg="4">
						<Form.Label> Submission Date </Form.Label>
						<Form.Control aria-label="cpa-select" type="date">
							<option>Select CPA</option>
						</Form.Control>
					</Col>
				</Form.Group>
			</Form>
		</Container>
	)
}