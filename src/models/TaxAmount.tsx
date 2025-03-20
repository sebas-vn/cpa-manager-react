import { UsState } from "./UsState";

export class TaxAmount {
	id: number;
	adjustedGrossIncome: number;
	taxableIncome: number;
	taxLiability: number;
	refundAmount: number;
	state: UsState;

	constructor(id: number, adjustedGrossIncome: number, taxableIncome: number, 
		taxLiability: number, refundAmount: number, state: UsState) {
		
		this.id = id;
		this.adjustedGrossIncome = adjustedGrossIncome;
		this.taxableIncome = taxableIncome;
		this.taxLiability = taxLiability;
		this.refundAmount = refundAmount;
		this.state = state;
	}
}