import { Form, InputGroup, Button, InputGroupText, FormControl, Feedback } from './reactBootstrapAdapter';
import { MortgageDetails } from '@/utils/MortgageCalculator/calculateRepayment';
import { getDefaultInterestRate, getMortgageDetails, getValidationErrors, setMortgageDetails, validateMortgageDetails } from './actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './mortgageDetails'
import { preinit } from 'react-dom';

export default async function MortgageDetailForm() {
  const currency = "£"
  const mortgageDetails = await getMortgageDetails();
  const defaultInterestRate = !mortgageDetails && await getDefaultInterestRate();
  const errors = mortgageDetails && validateMortgageDetails(mortgageDetails)


  return (
    <Form action={setMortgageDetails} noValidate>
      <Form.Label htmlFor="price">Property Price</Form.Label>
      <InputGroup className="mb-3" hasValidation>
        <InputGroupText>{currency}</InputGroupText>
        <Form.Control
          id="price"
          name='price'
          type="number"
          className="no-spinner"
          step="any"
          defaultValue={300_000}
          isInvalid={errors && errors.price.length > 0}
        />
        {
          errors?.price.map((msg, index) => {
            return (
              <Feedback type="invalid" key={`priceError${index}`}>
                {msg}
              </Feedback>
            )
          })
        }

      </InputGroup>
      <Form.Label htmlFor="deposit">Deposit</Form.Label>
      <InputGroup className="mb-3" hasValidation>
        <InputGroupText>{currency}</InputGroupText>
        <Form.Control
          id="deposit"
          name="deposit"
          type="number"
          className="no-spinner"
          step="any"
          defaultValue={50_000}
          isInvalid={errors && errors.deposit.length > 0}
        />
        {
          errors?.deposit.map((msg, index) => {
            return (
              <Feedback type="invalid" key={`depositError${index}`}>
                {msg}
              </Feedback>
            )
          })
        }
      </InputGroup>

      <Form.Label htmlFor="term">Mortgage Term</Form.Label>
      <InputGroup className="mb-3" hasValidation>
        <Form.Control
          id="term"
          name="term"
          type="number"
          step="any"
          defaultValue={15}
          isInvalid={errors && errors.term.length > 0}
        />
        {
          errors?.term.map((msg, index) => {
            return (
              <Feedback type="invalid" key={`termError${index}`}>
                {msg}
              </Feedback>
            )
          })
        }
        <InputGroupText>years</InputGroupText>
      </InputGroup>
      <Form.Label htmlFor="interest">Interest rate</Form.Label>
      <InputGroup className="mb-3" hasValidation>
        <Form.Control
          id="interest"
          name="interest"
          type="number"
          step="any"
          className="no-spinner"
          defaultValue={defaultInterestRate || mortgageDetails?.annualInterestRate}
          isInvalid={errors && errors.interest.length > 0}
        />
        {
          errors?.interest.map((msg, index) => {
            return (
              <Feedback type="invalid" key={`interestError${index}`}>
                {msg}
              </Feedback>
            )
          })
        }
        <InputGroupText>%</InputGroupText>
      </InputGroup>
      <Button className="w-full" variant="outline-primary" type="submit">
        Calculate
      </Button>
    </Form>
  )
}