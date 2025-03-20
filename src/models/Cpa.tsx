export class Cpa {
	id: number;
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;

	constructor(id: number, firstName: string, middleName: string, lastName: string, 
		email: string) {
			
		this.id = id;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.email = email;
	}
}