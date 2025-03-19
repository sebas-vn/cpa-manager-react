export class Client {
	id: number;
	firstName: String;
	middleName: String;
	lastName: String;
	email: String;
	mobileNumber: String;
	homeNumber: String;
	ssn: String;
	ein: String;

	constructor(id: number, firstName: String, middleName: String, lastName: String, 
		email: String, mobileNumber: String, homeNumber: String, ssn: String, ein: String) {
			
		this.id = id;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.email = email;
		this.mobileNumber = mobileNumber;
		this.homeNumber = homeNumber;
		this.ssn = ssn;
		this.ein = ein;
	}
}