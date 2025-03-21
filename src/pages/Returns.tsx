import { Badge, Button, Col, Container, Row, Table } from "react-bootstrap";

import '../css/Returns.css';

import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { TaxReturn } from "../models/TaxReturn";
import { ReturnModal } from "../components/ReturnModal";
import { PageContext } from "./Frame";
import { TaxReturnCategory } from "../models/Category";

export const taxReturnContext = createContext(null);

export const Returns = () => {

	const [_,setActivePage] = useContext(PageContext);
	const [taxReturns, setTaxReturns] = useState([]);
    const [selectedTaxReturn, setSelectedTaxReturn] = useState(null);
    const [show, setShow] = useState(false);
	const [isNewReturn, setIsNewReturn] = useState(false);

	useEffect(() => {
		setActivePage("Tax Returns")
		getAllReturns();
	},[])

    const handleModal = () => {
		setShow(!show);	
		setSelectedTaxReturn([]);
		setIsNewReturn(false);
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

	const newReturn = () => {
		setSelectedTaxReturn({ id: 0,
			taxYear: 0,
			submissionDate: null,
			createdAt: null,
			categories: [],
			client: {},
			cpa: {},
			filingType: {},
			status: {},
			complexity: {},
			taxAmounts: []}
		);

		setIsNewReturn(true);
		setShow(!show);

	}

	const createNewReturn = async (taxReturn: TaxReturn) => {
		// set ids to 0 to deserialize in the backend
		taxReturn.taxAmounts.forEach(taxAmount => taxAmount.id = 0);
		let headers = new AxiosHeaders();

		await axios.post(`http://localhost:8080/tax-returns`, taxReturn, {headers: headers})
		.then(response => {
			getAllReturns();
			setIsNewReturn(false);
			setShow(!show);
		}).catch((e) => {
			console.log("Something went wrong!");
		});
	}

	const updateReturn = async (taxReturn: TaxReturn) => {
		let headers = new AxiosHeaders();

		await axios.put(`http://localhost:8080/tax-returns/${taxReturn.id}`, taxReturn,{headers: headers})
		.then(response => {
			let updatedReturn = new TaxReturn(response.data);
			setTaxReturns((currentList) => currentList.map(tr => tr.id == updatedReturn.id ? updatedReturn : tr));
			setIsNewReturn(false);
			setShow(!show);
		}).catch((e) => {
			console.log("Something went wrong!");
		});
	}

	const deleteReturn = async (id: number) => {
		let headers = new AxiosHeaders();

		await axios.delete(`http://localhost:8080/tax-returns/${id}`,{headers: headers})
		.then(response => {
			if (response.status == 204) {
				setTaxReturns((prevTReturns) => prevTReturns.filter((client: TaxReturn) => client.id != id ? client : null));
				setShow(!show);
			}
		}).catch((e) => {
			console.log("Something went wrong!");
		});
	}

	return (
		<section>
			<Container>
				<Row>
					<Col>
						<Button className="create-btn" variant="primary" onClick={newReturn}>
							Create
						</Button>
					</Col>
				</Row>
			</Container>
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

			<taxReturnContext.Provider value={[selectedTaxReturn, setSelectedTaxReturn]}>
            	<ReturnModal taxReturn={selectedTaxReturn} saveReturn={updateReturn} deleteReturn={deleteReturn}
				handleModal={handleModal} show={show} createNewReturn={createNewReturn} newReturn={isNewReturn}/>
			</taxReturnContext.Provider>

		</section>
	)
}	