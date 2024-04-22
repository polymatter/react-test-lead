import { Table } from '@/utils/ReactBootstrapAdapter/reactBootstrapAdapter'
import type { MortgageDetails } from '@/utils/MortgageCalculator/calculateRepayment'
import { formatCurrency } from '@/utils/FormatCurrency/formatCurrency'
import { calculateMonthlyPayment } from '@/utils/MortgageCalculator/calculateRepayment';
import { anyValidationErrors, getMortgageDetails, validateMortgageDetails } from './actions';

function calculateAffordabilityCheck(mortgageDetails: MortgageDetails) {
  const affordabilityAdjustment = 3;
  const affordabilityMortgageDetails: MortgageDetails = {
    ...mortgageDetails,
    annualInterestRate: mortgageDetails.annualInterestRate + affordabilityAdjustment
  };
  return calculateMonthlyPayment(affordabilityMortgageDetails)
}

function calculateCapital(mortgageDetails: MortgageDetails) {
  const { deposit, propertyPrice } = mortgageDetails;
  return propertyPrice - deposit;
}

export default async function ResultsTable() {
  const mortgageDetails = await getMortgageDetails();
  const hasErrors = mortgageDetails && anyValidationErrors(validateMortgageDetails(mortgageDetails))
  if (!mortgageDetails || hasErrors) return <></>

  const monthlyPayment = calculateMonthlyPayment(mortgageDetails);
  const affordabilityCheck = calculateAffordabilityCheck(mortgageDetails);
  const capital = calculateCapital(mortgageDetails);
  const totalRepayment = mortgageDetails.mortgageTermInYears * 12 * monthlyPayment;
  const wholeTermInterest = totalRepayment - capital;


  const results : [string, string][] = [
    ["Monthly Payment", formatCurrency(monthlyPayment)],
    ["Total Repayment", formatCurrency(totalRepayment)],
    ["Capital", formatCurrency(capital)],
    ["Interest", formatCurrency(wholeTermInterest)],
    ["Affordability check", formatCurrency(affordabilityCheck)]
  ]

  return (
    <>
      <h2 className="pb-3">Results</h2>
      <Table striped="columns">
        <tbody>
          {results.map(([name, value], index) => {
            return (
              <tr className={ index !== 0 ? 'border-b' : 'border-b border-t'} key={`result${index}`}>
                <td>{name}</td>
                <td className="text-right">{value}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}