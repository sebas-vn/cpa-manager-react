import { TaxReturnCategory } from "./Category";
import { Client } from "./Client";
import { Cpa } from "./Cpa";
import { TaxReturnFilingType } from "./FilingType";
import { TaxReturnStatus } from "./Status";
import { TaxAmount } from "./TaxAmount";
import { TaxReturnComplexity } from "./TaxReturnComplexity";

interface TaxReturnProp {
	id: number;
	taxYear: number;
	submissionDate: string;
	createdAt: Date;
	categories: TaxReturnCategory[]
	client: Client;
	cpa: Cpa;
	filingType: TaxReturnFilingType;
	status: TaxReturnStatus;
	complexity: TaxReturnComplexity;
	taxAmounts: TaxAmount[]
}

export class TaxReturn {
	id: number;
	taxYear: number;
	submissionDate: string;
	createdAt: Date;
	categories: TaxReturnCategory[]
	client: Client;
	cpa: Cpa;
	filingType: TaxReturnFilingType;
	status: TaxReturnStatus;
	complexity: TaxReturnComplexity;
	taxAmounts: TaxAmount[]

	constructor(props: TaxReturnProp) {
		Object.assign(this, props);
	}

	// constructor(id: number, taxYear: number, submissionDate: Date, categories: TaxReturnCategory[], 
	// 	client: Client, cpa: Cpa, filingType: TaxReturnFilingType, status: TaxReturnStatus, 
	// 	complexity: TaxReturnComplexity, taxAmounts: TaxAmount[]
	// ) {
	// 	this.id = id;
	// 	this.taxYear = taxYear;
	// 	this.submissionDate = submissionDate;
	// 	this.categories = categories;
	// 	this.client = client;
	// 	this.cpa = cpa;
	// 	this.filingType = filingType;
	// 	this.status = status;
	// 	this.complexity = complexity;
	// 	this.taxAmounts = taxAmounts;
	// }
}