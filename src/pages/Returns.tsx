import { Table } from "react-bootstrap";

import '../css/Returns.css';

import { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { TaxReturn } from "../models/TaxReturn";
import { ReturnModal } from "../components/Modal";

export const Returns = () => {

	const [taxReturns, setTaxReturns] = useState([]);
    const [selectedTaxReturn, setSelectedTaxReturn] = useState(null);
    const [show, setShow] = useState(false);

	useEffect(() => {
		getAllReturns();
	})

    const handleModal = () => setShow(!show);

    const showModal = (taxReturn: TaxReturn) => {
        setSelectedTaxReturn(taxReturn);
        setShow(!show);
    }

	const getAllReturns = async () => {
		let headers = new AxiosHeaders();

		await axios.get('http://localhost:8080/tax-returns', {headers: headers})
		.then(response => {
			setTaxReturns(
				response.data.map((taxReturn: TaxReturn) => {
					return new TaxReturn(taxReturn);
				})
			)
		});
	}

	return (
		<section>
			<Table bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Client</th>
						<th>Year</th>
						<th>Submitted At</th>
						<th>Filing Type</th>
						<th>Complexity</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
                    {
                        taxReturns.map((taxReturn: TaxReturn) => {
                            return (
                                <>
                                    <tr onClick={() => showModal(taxReturn)} key={taxReturn.id}>
                                        <td> { taxReturn.id } </td>
                                        <td> { `${taxReturn.client.firstName} ${taxReturn.client.lastName}` } </td>
                                        <td> { taxReturn.taxYear } </td>
                                        <td> { taxReturn.submissionDate ? new Date(taxReturn.submissionDate).toLocaleDateString() : ""} </td>
                                        <td> { taxReturn.filingType.name } </td>
                                        <td> { taxReturn.complexity.name } </td>
                                        <td> { taxReturn.status.name } </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                    
				</tbody>
			</Table>

            <ReturnModal taxReturn={selectedTaxReturn} handleModal={handleModal} show={show}/>
		</section>
	)
}	