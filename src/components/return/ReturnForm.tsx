import { Col, Container, Form, Row } from "react-bootstrap"
import { TaxReturn } from "../../models/TaxReturn"
import { TaxReturnFilingType } from "../../models/FilingType"
import { TaxReturnComplexity } from "../../models/TaxReturnComplexity"
import { TaxReturnStatus } from "../../models/Status"
import { Client } from "../../models/Client"
import { Cpa } from "../../models/Cpa"
import { useContext } from "react"
import { taxReturnContext } from "../../pages/Returns"

type returnFormProp = {
	clients: Client[];
	cpas: Cpa[];
	referenceData: any
}

export const ReturnForm = ({clients, cpas, referenceData}: returnFormProp) => {

	const [selectedTaxReturn, setSelectedTaxReturn]:[TaxReturn, any] = useContext(taxReturnContext);

	const handleChange = (e) => {
		let typeProperty = typeof selectedTaxReturn[e.target.name];

		// on handleChange check if the target.name is an object or primitive
		if (typeProperty != "object" || e.target.name === "submissionDate") {
			let converted = typeProperty === "number" ? parseInt(e.target.value) : e.target.value;
			setSelectedTaxReturn(curr => {
				return {...curr, [e.target.name]: converted}
			})			
		} else {
			// update if it is an object
			setSelectedTaxReturn(curr => {
				return {
					...curr,
					[e.target.name]: {
					...curr[e.target.name],
					id: parseInt(e.target.value),
					},
				}
			})
		}


	}

	return (
		<Container>
			<Form>
				<Form.Group as={Row}>
					<Col md="6" lg="5">
						<Form.Label> Client </Form.Label>
						<Form.Select name="client"
						aria-label="client-select" value={selectedTaxReturn.client.id} onChange={(e) => handleChange(e)}>
							<option>Select Client</option>
							{
								clients?.map(client => {
									return (
										<option key={client.id} value={client.id}> {`${client.firstName} ${client.lastName}`} </option>
									);
								})
							}
						</Form.Select>
					</Col>
					<Col md="6" lg="5">
						<Form.Label> CPA </Form.Label>
						<Form.Select value={selectedTaxReturn.cpa.id} name="cpa" onChange={(e) => handleChange(e)}>
							<option>Select CPA</option>
							{
								cpas?.map(cpa => {
									return (
										<option key={cpa.id} value={cpa.id}> {`${cpa.firstName} ${cpa.lastName}`} </option>
									);
								})
							}
						</Form.Select>
					</Col>
					<Col md="6" lg="2">
						<Form.Label> Tax Year </Form.Label>
						<Form.Control type="number" name="taxYear" onChange={handleChange} defaultValue={0}/>
					</Col>
				</Form.Group>
				<hr />
				<Form.Group as={Row}>
					<Col md="3" lg="3">
						<Form.Label> Filing Type </Form.Label>
						<Form.Select name="filingType" value={selectedTaxReturn.filingType.id} 
						onChange={handleChange}>
							<option>Filing Type</option>
							{
								referenceData.filingTypes?.map((type: TaxReturnFilingType) => {
									return (
										<option key={type.id} value={type.id}> {type.name} </option>
									);
								})
							}
						</Form.Select>
					</Col>
					<Col md="3" lg="3">
						<Form.Label> Complexity </Form.Label>
						<Form.Select onChange={handleChange} name="complexity"
						value={selectedTaxReturn.complexity.id}>
							<option>Complexity</option>
							{
								referenceData.complexities?.map((type: TaxReturnComplexity) => {
									return (
										<option key={type.id} value={type.id}> {type.name} </option>
									);
								})
							}
						</Form.Select>
					</Col>
					<Col md="3" lg="3">
						<Form.Label> Status </Form.Label>
						<Form.Select onChange={handleChange} value={selectedTaxReturn.status.id} name="status">
							<option>Status</option>
							{
								referenceData.statuses?.map((type: TaxReturnStatus) => {
									return (
										<option key={type.id} value={type.id}> {type.name} </option>
									);
								})
							}
						</Form.Select>
					</Col>
					<Col md="3" lg="3">
						<Form.Label> Submission Date </Form.Label>
						<Form.Control aria-label="cpa-select" type="date" name="submissionDate" onChange={handleChange}
						defaultValue={selectedTaxReturn.submissionDate === null ? new Date(selectedTaxReturn.submissionDate).toISOString().split("T")[0] : ''}/>
					</Col>
				</Form.Group>
			</Form>
		</Container>
	)
}