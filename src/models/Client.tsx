interface ClientProp {
	id: number;
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	mobileNumber: string;
	homeNumber: string;
	ssn: string;
	ein: string;
}

export class Client {
	id: number;
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	mobileNumber: string;
	homeNumber: string;
	ssn: string;
	ein: string;

	constructor(props: ClientProp) {
		Object.assign(this, props);
	}

	// constructor(id: number, firstName: string, middleName: string, lastName: string, 
	// 	email: string, mobileNumber: string, homeNumber: string, ssn: string, ein: string) {
			
	// 	this.id = id;
	// 	this.firstName = firstName;
	// 	this.middleName = middleName;
	// 	this.lastName = lastName;
	// 	this.email = email;
	// 	this.mobileNumber = mobileNumber;
	// 	this.homeNumber = homeNumber;
	// 	this.ssn = ssn;
	// 	this.ein = ein;
	// }
}