import { MortgageDetails, calculateMonthlyPayment } from "./calculateRepayment";

/**
 * Calculates the schedule of remaining debt on a monthly basis but collected yearly
 * 
 * Makes a single pass returning an array of remaining debt at the end of each year of the mortgage term
 * 
 * @param mortgageDetails details of the mortgage
 * @returns an array of the remaining debt indexed by year
 */
export function calculateRemainingDebt(mortgageDetails : MortgageDetails): Array<number> {
  const monthsInAYear = 12;
  const monthlyPayment = calculateMonthlyPayment(mortgageDetails);
  const {propertyPrice, deposit, annualInterestRate, mortgageTermInYears} = mortgageDetails;
  const mortgageTermInMonths = mortgageTermInYears * monthsInAYear;
  const monthlyInterestRate = annualInterestRate / monthsInAYear;

  let remainingDebt = propertyPrice - deposit;
  let remainingDebtArray : number[] = [];
  for (let month = 0; month <= mortgageTermInMonths; ++month) {
    if (month % monthsInAYear === 0) {
      remainingDebtArray.push(Math.round(remainingDebt));
    }
    remainingDebt *= (1 + monthlyInterestRate / 100);
    remainingDebt -= monthlyPayment;
  }
  return remainingDebtArray;
}