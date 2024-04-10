import { calculateRemainingDebt } from './calculateRemainingDebt'
import { MortgageDetails } from './calculateRepayment'

describe("calculateRemainingDebt", () => {
  test("should calculate correct for example", () => {
    const mortgageDetails : MortgageDetails = {
      propertyPrice: 100_000,
      deposit: 5_000,
      annualInterestRate: 5.25,
      mortgageTermInYears: 15
    };
    const expectedResult = [
      95_000,
      90_721,
      86_213,
      81_461,
      76_454,
      71_178,
      65_618,
      59_760,
      53_586,
      47_080,
      40_224,
      32_999,
      25_386,
      17_363,
      8_909,
      0
    ]
    const result = calculateRemainingDebt(mortgageDetails);

    expect(result).toEqual(expectedResult);
  });
})