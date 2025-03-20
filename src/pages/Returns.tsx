import { Badge, Table } from "react-bootstrap";

import '../css/Returns.css';

import { useContext, useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { TaxReturn } from "../models/TaxReturn";
import { ReturnModal } from "../components/ReturnModal";
import { PageContext } from "./Frame";
import { TaxReturnCategory } from "../models/Category";

export const Returns = () => {

	const [_,setActivePage] = useContext(PageContext);
	const [taxReturns, setTaxReturns] = useState([]);
    const [selectedTaxReturn, setSelectedTaxReturn] = useState(null);
    const [show, setShow] = useState(false);
	const [isEdit, setIsEdit] = useState(false)

	useEffect(() => {
		setActivePage("Tax Returns")
		getAllReturns();
	},[])

    const handleModal = () => {
		setShow(!show);
		setIsEdit((prev) => prev ? false : false);
	};

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
						<th>Categories</th>
					</tr>
				</thead>
				<tbody>
                    {
                        taxReturns.map((taxReturn: TaxReturn) => {
                            return (
								<tr onClick={() => showModal(taxReturn)} key={taxReturn.id}>
									<td> { taxReturn.id } </td>
									<td> { `${taxReturn.client.firstName} ${taxReturn.client.lastName}` } </td>
									<td> { taxReturn.taxYear } </td>
									<td> { taxReturn.submissionDate ? new Date(taxReturn.submissionDate).toLocaleDateString() : ""} </td>
									<td> { taxReturn.filingType.name } </td>
									<td> { taxReturn.complexity.name } </td>
									<td> { taxReturn.status.name } </td>
									<td>
										{
											taxReturn.categories.map((category: TaxReturnCategory) => {
												return (
													<Badge key={category.id} pill bg="primary">{category.name}</Badge>
												)
											})
										}
									</td>
								</tr>
                            )
                        })
                    }
                    
				</tbody>
			</Table>

            <ReturnModal taxReturn={selectedTaxReturn} handleModal={handleModal} show={show} isEdit={isEdit}/>
		</section>
	)
}	