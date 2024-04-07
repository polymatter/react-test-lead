import { calculateMonthlyPayment } from "./calculateRepayment";

describe("calculateMonthlyPayment", () => {
  test("should calculate the correct monthly payment with interest", () => {
    const result = calculateMonthlyPayment(300000, 60000, 3.5, 30);
    expect(result).toBeCloseTo(1077.71, 2);
  });

  test("should calculate the correct monthly payment without interest", () => {
    const result = calculateMonthlyPayment(300000, 60000, 0, 30);
    expect(result).toBeCloseTo(666.67, 2);
  });

  test("should calculate the correct monthly payment with a different term", () => {
    const result = calculateMonthlyPayment(300000, 60000, 3.5, 15);
    expect(result).toBeCloseTo(1715.72, 2);
  });

  test("should throw an error when the property price is less than 0", () => {
    expect(() => {
      calculateMonthlyPayment(0, 60000, 3.5, 15);
    }).toThrow("Property Price should be greater than 0");
  });

  test("should throw an error when the deposit is less than 0", () => {
    expect(() => {
      calculateMonthlyPayment(300000, -5000, 3.5, 15);
    }).toThrow("Deposit should be 0 or higher");
  });

  test("should throw an error when the deposit is greater than the property price", () => {
    expect(() => {
      calculateMonthlyPayment(300000, 500000, 3.5, 15);
    }).toThrow("Deposit should be less than Property Price");
  });

  test("should throw an error when the annual interest rate is less than 0", () => {
    expect(() => {
      calculateMonthlyPayment(300000, 60000, -3.5, 15);
    }).toThrow("Annual Interest Rate should be higher than 0");
  });

  test("should throw an error when the annual interest rate is greater than 100", () => {
    expect(() => {
      calculateMonthlyPayment(300000, 60000, 103.5, 15);
    }).toThrow("Annual Interest Rate should be less than 100");
  });

  test("should throw an error when the mortgage term in years is less than 0", () => {
    expect(() => {
      calculateMonthlyPayment(300000, 60000, 3.5, -15);
    }).toThrow("Mortgage Term in Years should be more than 0");
  });

});
