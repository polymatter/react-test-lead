import { z } from 'zod';

export const schema = z.object({
  propertyPrice: z.number().min(0, {
    message: 'Property price should be greater than 0'
  }),
  deposit: z.number().min(0, {
    message: "Deposit should be 0 or higher"
  }),
  annualInterestRate: z.number().min(0, {
    message: "Annual Interest Rate should be greater than 0"
  }).max(100, {
    message: "Annual Interest Rate should be less than 100"
  }),
  mortgageTermInYears: z.number().min(0, {
    message: "Mortgage Term in Years should be greater than 0"
  })
}).refine(data => data.deposit < data.propertyPrice, {
  message: "Deposit should be less than Property Price",
  path: ["deposit"]
});
