export class Cpa {
	id: number;
	firstName: String;
	middleName: String;
	lastName: String;
	email: String;

	constructor(id: number, firstName: String, middleName: String, lastName: String, 
		email: String) {
			
		this.id = id;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.email = email;
	}
}