import { Button, Modal, Tab, Tabs } from "react-bootstrap"
import { TaxReturn } from "../models/TaxReturn"
import { useContext, useState } from "react";
import { TaxAmountTable } from "./TaxAmountTable";
import { PersonView } from "./PersonView";
import { ReturnForm } from "./ReturnForm";
import { TaxAmountForm } from "./TaxAmountForm";
import { taxReturnContext } from "../pages/Returns";
import { useApi } from "../context/ApiContext";

type PropsReturnModal = {
	taxReturn: TaxReturn;
	handleModal: any;
	show: any;
	saveReturn: Function
}

export const ReturnModal = ({taxReturn, handleModal, show, saveReturn}: PropsReturnModal) => {

	const [editMode, setEditMode] = useState(false);
	const [selectedTaxReturn] = useContext(taxReturnContext);

	// "injecting" api service containing data for forms
	const api = useApi();

	// setting states for selects once editMode is TRUE
	const [clients, setClients] = useState([]);
	const [cpas, setCpas] = useState([]);
	const [referenceData, setReferenceData] = useState({states: [], filingTypes: [], complexities: [], statuses: []});

	const handleSecondary = () => {
		if (editMode) {
			setEditMode(!editMode);
			return;
		} 
		handleModal();
	}

	const handlePrimary = async () => {
		if (editMode) {
			saveReturn(selectedTaxReturn);
			return;
		} 
		setEditMode(!editMode);
		// get all apis to set forms
		api.getAllClients().then(clients => setClients(clients));
		api.getAllCPAs().then(cpas => setCpas(cpas));
		api.getAllReferenceData().then((data) => setReferenceData(data));
	}

	return (
		<Modal show={show} onExit={() => setEditMode(false)} dialogClassName="modal-90w"
		onHide={handleModal} key={taxReturn?.id+'R'}>
			<Modal.Header closeButton>
			<Modal.Title>Tax Return</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{
					!editMode &&
					<Tabs
						defaultActiveKey="client"
						id="fill-tab-example"
						className="mb-3"
						fill
						>
						<Tab eventKey="client" title="Client">
							<PersonView person={taxReturn?.client}/>
						</Tab>
						<Tab eventKey="tax-amounts" title="Amounts">
							<TaxAmountTable taxAmounts={taxReturn?.taxAmounts}/>
						</Tab>
						<Tab eventKey="cpa" title="CPA">
							<PersonView person={taxReturn?.cpa}/>
						</Tab>
					</Tabs>
				}

				{
					editMode && 

					<Tabs
						defaultActiveKey="return"
						id="return-form-modal-body"
						className="mb-3"
						fill
						>
						<Tab eventKey="return" title="Return">
							<ReturnForm clients={clients} cpas={cpas} referenceData={referenceData}/>
						</Tab>
						<Tab eventKey="tax-amounts" title="Tax Amounts">
							<TaxAmountForm taxAmounts={taxReturn?.taxAmounts}/>
						</Tab>
						<Tab eventKey="categories" title="Categories">
							<TaxAmountTable taxAmounts={taxReturn?.taxAmounts}/>
						</Tab>
					</Tabs>
					
				}
			</Modal.Body>
			<Modal.Footer>
			<Button variant="secondary" onClick={handleSecondary}>
				{editMode ? "Cancel" : "Close"}
			</Button>
			<Button variant="primary" onClick={handlePrimary}>
				{editMode ? "Save" : "Edit"}
			</Button>
			</Modal.Footer>
		</Modal>
	)
}