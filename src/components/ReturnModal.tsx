import { Button, Modal, Tab, Tabs } from "react-bootstrap"
import { TaxReturn } from "../models/TaxReturn"
import { useState } from "react";
import { TaxAmountTable } from "./TaxAmountTable";
import { PersonView } from "./PersonView";

type PropsReturnModal = {
	taxReturn: TaxReturn;
	handleModal: any,
	show: any
}

export const ReturnModal = ({taxReturn, handleModal, show}: PropsReturnModal) => {

	const [editMode, setEditMode] = useState(false);

	return (
		<Modal show={show} dialogClassName="modal-90w"
		onHide={handleModal} key={taxReturn?.id+'R'}>
			<Modal.Header closeButton>
			<Modal.Title>Tax Return</Modal.Title>
			</Modal.Header>
			<Modal.Body>
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
			</Modal.Body>
			<Modal.Footer>
			<Button variant="secondary" onClick={handleModal}>
				Close
			</Button>
			<Button variant="primary" onClick={handleModal}>
				Save Changes
			</Button>
			</Modal.Footer>
		</Modal>
	)
}