import { calculateMonthlyPayment, MortgageDetails } from "./calculateRepayment";

describe("calculateMonthlyPayment", () => {
  test("should calculate the correct monthly payment with interest", () => {
    const mortgageDetails : MortgageDetails = {
      propertyPrice: 300_000,
      deposit: 60_000,
      annualInterestRate: 3.5,
      mortgageTermInYears: 30
    }
    const result = calculateMonthlyPayment(mortgageDetails);
    expect(result).toBeCloseTo(1077.71, 2);
  });

  test("should calculate the correct monthly payment without interest", () => {
    const mortgageDetails : MortgageDetails = {
      propertyPrice: 300_000,
      deposit: 60_000,
      annualInterestRate: 0,
      mortgageTermInYears: 30
    }
    const result = calculateMonthlyPayment(mortgageDetails);
    expect(result).toBeCloseTo(666.67, 2);
  });

  test("should calculate the correct monthly payment with a different term", () => {
    const mortgageDetails : MortgageDetails = {
      propertyPrice: 300_000,
      deposit: 60_000,
      annualInterestRate: 3.5,
      mortgageTermInYears: 15
    }
    const result = calculateMonthlyPayment(mortgageDetails);
    expect(result).toBeCloseTo(1715.72, 2);
  });

  test("should throw an error when the property price is less than 0", () => {
    expect(() => {
      const mortgageDetails : MortgageDetails = {
        propertyPrice: 0,
        deposit: 60_000,
        annualInterestRate: 3.5,
        mortgageTermInYears: 15
      }
      calculateMonthlyPayment(mortgageDetails);
    }).toThrow("Property Price should be greater than 0");
  });

  test("should throw an error when the deposit is less than 0", () => {
    expect(() => {
      const mortgageDetails : MortgageDetails = {
        propertyPrice: 300_000,
        deposit: -5_000,
        annualInterestRate: 3.5,
        mortgageTermInYears: 15
      }
      calculateMonthlyPayment(mortgageDetails);
    }).toThrow("Deposit should be 0 or higher");
  });

  test("should throw an error when the deposit is greater than the property price", () => {
    expect(() => {
      const mortgageDetails : MortgageDetails = {
        propertyPrice: 300_000,
        deposit: 500_000,
        annualInterestRate: 3.5,
        mortgageTermInYears: 15
      }
      calculateMonthlyPayment(mortgageDetails);
    }).toThrow("Deposit should be less than Property Price");
  });

  test("should throw an error when the annual interest rate is less than 0", () => {
    expect(() => {
      const mortgageDetails : MortgageDetails = {
        propertyPrice: 300_000,
        deposit: 60_000,
        annualInterestRate: -3.5,
        mortgageTermInYears: 15
      }
      calculateMonthlyPayment(mortgageDetails);
    }).toThrow("Annual Interest Rate should be higher than 0");
  });

  test("should throw an error when the annual interest rate is greater than 100", () => {
    expect(() => {
      const mortgageDetails : MortgageDetails = {
        propertyPrice: 300_000,
        deposit: 60_000,
        annualInterestRate: 103.5,
        mortgageTermInYears: 15
      }
      calculateMonthlyPayment(mortgageDetails);
    }).toThrow("Annual Interest Rate should be less than 100");
  });

  test("should throw an error when the mortgage term in years is less than 0", () => {
    expect(() => {
      const mortgageDetails : MortgageDetails = {
        propertyPrice: 300_000,
        deposit: 60_000,
        annualInterestRate: 3.5,
        mortgageTermInYears: -15
      }
      calculateMonthlyPayment(mortgageDetails);
    }).toThrow("Mortgage Term in Years should be more than 0");
  });

});
