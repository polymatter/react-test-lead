export interface MortgageDetails {
  propertyPrice: number,
  deposit: number,
  annualInterestRate: number,
  mortgageTermInYears: number
}

/**
 * Calculates the monthly mortgage payment.
 *
 * @param mortgageDetails object containing details of mortgage required
 * @returns The monthly mortgage payment.
 */
export function calculateMonthlyPayment({
  propertyPrice,
  deposit,
  annualInterestRate,
  mortgageTermInYears
} : MortgageDetails): number {

  if (propertyPrice <= 0) throw new Error("Property Price should be greater than 0");
  if (deposit < 0) throw new Error("Deposit should be 0 or higher");
  if (deposit > propertyPrice) throw new Error("Deposit should be less than Property Price");
  if (annualInterestRate < 0) throw new Error("Annual Interest Rate should be higher than 0");
  if (annualInterestRate > 100) throw new Error("Annual Interest Rate should be less than 100");
  if (mortgageTermInYears <= 0) throw new Error("Mortgage Term in Years should be more than 0");

  const adjustedLoanAmount = propertyPrice - deposit;
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = mortgageTermInYears * 12;

  if (monthlyInterestRate === 0) {
    return adjustedLoanAmount / numberOfPayments;
  }

  const monthlyPayment =
    (adjustedLoanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return monthlyPayment;
}
