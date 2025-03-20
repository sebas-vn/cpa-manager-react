import { Button, Modal, Tab, Tabs } from "react-bootstrap"
import { TaxReturn } from "../models/TaxReturn"
import { useState } from "react";

type PropsReturnModal = {
	taxReturn: TaxReturn;
	handleModal: any,
	show: any
}

export const ReturnModal = ({taxReturn, handleModal, show}: PropsReturnModal) => {

	const [editMode, setEditMode] = useState(false);

	return (
		<Modal show={show} onHide={handleModal} key={taxReturn?.id+'R'}>
			<Modal.Header closeButton>
			<Modal.Title>Tax Return</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Tabs
					defaultActiveKey="profile"
					id="fill-tab-example"
					className="mb-3"
					fill
					>
					<Tab eventKey="client" title="Client">
						<section>
							<div className="modal-client-names">
								
							</div>
							<div className="modal-client-email">

							</div>
							<div className="modal-client-phones">

							</div>
						</section>
					</Tab>
					<Tab eventKey="profile" title="Profile">
						Tab content for Profile
					</Tab>
					<Tab eventKey="longer-tab" title="Loooonger Tab">
						Tab content for Loooonger Tab
					</Tab>
					<Tab eventKey="contact" title="Contact" disabled>
						Tab content for Contact
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