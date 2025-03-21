import { Table } from "react-bootstrap"
import { TaxAmount } from "../../models/TaxAmount"


export const TaxAmountTable = ({ taxAmounts }) => {
	
	return (
		<Table bordered hover>
		<thead>
			<tr>
				<th>#</th>
				<th>Adjusted Gross Income</th>
				<th>Taxable Income</th>
				<th>Tax Liability</th>
				<th>Refund Amount</th>
				<th>State</th>
			</tr>
		</thead>
		<tbody>
			{
				taxAmounts.map((taxAmount: TaxAmount) => {
					return (
						<tr key={`RA${taxAmount.id}`}>
							<td> { taxAmount.id } </td>
							<td> { taxAmount.adjustedGrossIncome } </td>
							<td> { taxAmount.taxableIncome } </td>
							<td> { taxAmount.taxLiability } </td>
							<td> { taxAmount.refundAmount } </td>
							<td> { taxAmount.state.name } </td>
						</tr>
					)
				})
			}
			
		</tbody>
	</Table>
	)
}