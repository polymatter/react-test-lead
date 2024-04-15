import type { MortgageDetails } from "@/utils/MortgageCalculator/calculateRepayment";
import { revalidatePath } from "next/cache";
import { schema } from './mortgageDetails';
import { ZodIssue } from "zod";

let mortgageDetails : MortgageDetails | undefined = undefined;
let errors : ZodIssue[] = [];

export const getMortgageDetails = async (): Promise<MortgageDetails | undefined> => {
  return Promise.resolve(mortgageDetails);
};

export const getValidationErrors = async (): Promise<ZodIssue[]> => {
  return Promise.resolve(errors);
}

type ValidationErrors = {
  price: string[],
  deposit: string[],
  term: string[],
  interest: string[]
}

export function validateMortgageDetails({ propertyPrice, deposit, annualInterestRate, mortgageTermInYears} : MortgageDetails) {
  let errors : ValidationErrors = {
    price: [],
    deposit: [],
    term: [],
    interest: []
  } ;
  if (propertyPrice <= 0) errors.price.push("Property Price should be greater than 0");
  if (deposit < 0) errors.deposit.push("Deposit should be 0 or higher");
  if (deposit > propertyPrice) {
    errors.deposit.push("Deposit should be less than Property Price");
    errors.price.push("Deposit should be less than Property Price");
  }
  if (annualInterestRate < 0) errors.interest.push("Annual Interest Rate should be higher than 0");
  if (annualInterestRate > 100) errors.interest.push("Annual Interest Rate should be less than 100");
  if (mortgageTermInYears <= 0) errors.term.push("Mortgage Term in Years should be more than 0");
  return errors;
}

export function anyValidationErrors(errors : ValidationErrors) {
  return errors.deposit.length > 0 || errors.interest.length > 0 || errors.price.length > 0 || errors.term.length > 0;
}

export async function setMortgageDetails(formData: FormData) {
  'use server';

  const newMortgageDetails = {
    propertyPrice: Number(formData.get("price")),
    annualInterestRate: Number(formData.get("interest")),
    deposit: Number(formData.get("deposit")),
    mortgageTermInYears: Number(formData.get("term")),
  };

  mortgageDetails = newMortgageDetails;
  revalidatePath('/');

  return { mortgageDetails } 
}

export async function getDefaultInterestRate() : Promise<number> {
  'use server'

  const data = await fetch("https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?csv.x=yes&Datefrom=18/Jan/2024&Dateto=18/Feb/2024&SeriesCodes=IUMABEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N");

  if (!data.ok) {
    console.log("Failed to load data")
    console.log(data.status)
    console.log(data.statusText)
    return 5.25
  }

  const csvData = await data.text()
  const byRows = csvData.trim().split('\n');
  const lastRow = byRows[byRows.length - 1];
  const secondColumnOfLastRow = lastRow.split(',')[1];
  console.log(secondColumnOfLastRow);
  return Number(secondColumnOfLastRow)
}