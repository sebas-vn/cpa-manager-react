import { Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import { TaxAmount } from "../models/TaxAmount"
import { useContext, useState } from "react"
import axios, { AxiosHeaders } from "axios"
import { taxReturnContext } from "../pages/Returns"
import { TaxReturn } from "../models/TaxReturn"

type TaxAmountFormProp = {
	taxAmounts: TaxAmount[]
}

export const TaxAmountForm = ({taxAmounts}: TaxAmountFormProp) => {

	const [selectedTaxReturn, setSelectedTaxReturn] = useContext(taxReturnContext);
	const [formData, setFormData] = useState(selectedTaxReturn.taxAmounts);

	const addRow = () => {
        setFormData([...formData, new TaxAmount(`r${formData.length+1}`,0,0,0,0)]);
		setSelectedTaxReturn((prev: TaxReturn) => {
			console.log(prev);
			prev.taxAmounts = [...formData]
			return prev;
		})
    };

    const deleteTaxAmount = async (id) => {
		let headers = new AxiosHeaders();
		await axios.delete(`http://localhost:8080/tax-amounts/${id}`, {headers: headers})
		.then(response => {
			if (response.status === 204) {
				setFormData((prevAmounts) => prevAmounts.filter((client: TaxAmount) => client.id != id ? client : null));
			}
		}).catch(() => "Something went wrong");
	}

    const handleChange = (e, id) => {
		setFormData((prev) => prev.map(el => {
			if (el.id == id) {
				el[e.target.name] = e.target.value
			}
			return el;
		}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };
	// Remove row
	const removeRow = (id) => {
		if (typeof id != "number") {
			setFormData((prevAmounts) => prevAmounts.filter(row => row.id != id));
		} else {
			deleteTaxAmount(id);
		}
	};

    return (
        <div className="container mt-4">
			<Form>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Adjusted Gross Income</th>
							<th>Taxable Income</th>
							<th>Tax Liability</th>
							<th>Refund Amount</th>
							<th>State</th>
						</tr>
					</thead>
					<tbody>
							{formData?.map((taxAmount: TaxAmount) => (
								<tr key={taxAmount.id}>
									<td>{taxAmount.id}</td>
									<td>
										<Form.Control
											type="number" name="adjustedGrossIncome"
											defaultValue={taxAmount.adjustedGrossIncome}
											onChange={(e) => handleChange(e, taxAmount.id)}
										/>
									</td>
									<td>
										<Form.Control
											type="number" name="taxableIncome"
											defaultValue={taxAmount.taxableIncome}
											onChange={(e) => handleChange(e, taxAmount.id)}
										/>
									</td>
									<td>
										<Form.Control
											type="number" name="taxLiability"
											defaultValue={taxAmount.taxLiability}
											onChange={(e) => handleChange(e, taxAmount.id)}
										/>
									</td>
									<td>
										<Form.Control
											type="number" name="refundAmount"
											defaultValue={taxAmount.refundAmount}
											onChange={(e) => handleChange(e, taxAmount.id)}
										/>
									</td>
									<td>
										<Form.Control
											type="text" name="stateName"
											defaultValue={taxAmount.state?.name}
											onChange={(e) => handleChange(e, taxAmount.id)}
										/>
									</td>
									<td>
										<Button variant="danger" onClick={() => removeRow(taxAmount.id)}>Delete</Button>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</Form>
            <Button variant="primary" onClick={addRow}>Add Row</Button>
        </div>
    );
}