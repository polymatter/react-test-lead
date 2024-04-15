import { Table } from './reactBootstrapAdapter';
import { formatCurrency } from '@/utils/FormatCurrency/formatCurrency';
import type { MortgageDetails } from '@/utils/MortgageCalculator/calculateRepayment';
import { calculateRemainingDebt } from '../utils/MortgageCalculator/calculateRemainingDebt';
import { anyValidationErrors, getMortgageDetails, validateMortgageDetails } from './actions';

function getRemainingDebt(mortgageDetails : MortgageDetails) {
  return calculateRemainingDebt(mortgageDetails)
}

export default async function YearlyBreakdown() {
  const mortgageDetails = await getMortgageDetails();
  const hasErrors = mortgageDetails && anyValidationErrors(validateMortgageDetails(mortgageDetails))
  if (!mortgageDetails || hasErrors) return <></>

  const remainingDebt = getRemainingDebt(mortgageDetails);

  function sequenceArray(length: number) {
    return Array.from({ length }, (_, index) => index);
  }

  return (
    <>
      <h2 className="pb-3">Yearly Breakdown</h2>
      <Table className="max-w-52" bordered hover size="sm">
        <thead>
          <tr>
            <th>Year</th>
            <th>Remaining Debt</th>
          </tr>
        </thead>
        <tbody>
          {sequenceArray(mortgageDetails.mortgageTermInYears + 1).map(year => {
            return (
              <tr key={year}>
                <td>{year}</td>
                <td>{formatCurrency(remainingDebt[year], 0)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}