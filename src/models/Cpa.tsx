interface CpaProp {
	id: number;
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	mobileNumber?: string;
	homeNumber?: string;
	ssn?: string;
	ein?: string;
}

export class Cpa {
	id: number;
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	mobileNumber?: string;
	homeNumber?: string;
	ssn?: string;
	ein?: string;

	constructor(prop: CpaProp) {
		Object.assign(this, prop);
	}
}