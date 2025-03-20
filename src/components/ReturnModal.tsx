import { Button, Modal, Tab, Tabs } from "react-bootstrap"
import { TaxReturn } from "../models/TaxReturn"
import { useState } from "react";
import { TaxAmountTable } from "./TaxAmountTable";
import { PersonView } from "./PersonView";
import { ReturnForm } from "./ReturnForm";

type PropsReturnModal = {
	taxReturn: TaxReturn;
	handleModal: any;
	show: any;
	isEdit: boolean;
}

export const ReturnModal = ({taxReturn, handleModal, show, isEdit}: PropsReturnModal) => {

	const [editMode, setEditMode] = useState(isEdit);

	return (
		<Modal show={show} dialogClassName="modal-90w"
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
						<Tab eventKey="cpa" title="CPA">
							<PersonView person={taxReturn?.cpa}/>
						</Tab>
						<Tab eventKey="tax-amounts" title="Amounts">
							<TaxAmountTable taxAmounts={taxReturn?.taxAmounts}/>
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
							<ReturnForm taxReturn={taxReturn}/>
						</Tab>
						<Tab eventKey="tax-amounts" title="Tax Amounts">
							<PersonView person={taxReturn?.cpa}/>
						</Tab>
						<Tab eventKey="categories" title="Categories">
							<TaxAmountTable taxAmounts={taxReturn?.taxAmounts}/>
						</Tab>
					</Tabs>
					
				}
			</Modal.Body>
			<Modal.Footer>
			<Button variant="secondary" onClick={handleModal}>
				Close
			</Button>
			<Button variant="primary" onClick={() => setEditMode(!editMode)}>
				{editMode ? "Save" : "Edit"}
			</Button>
			</Modal.Footer>
		</Modal>
	)
}