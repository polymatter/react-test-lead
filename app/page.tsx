'use client';

import React, { FormEventHandler, useEffect, useState } from 'react';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Navbar from "react-bootstrap/Navbar";

import { formatCurrency } from "../utils/FormatCurrency/formatCurrency";
import { calculateMonthlyPayment, MortgageDetails } from '../utils/MortgageCalculator/calculateRepayment';

export default function MortgageCalculator() {
  const currency = "£"
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [mortgageDetails, setMortgageDetails] = useState<MortgageDetails>();
  const [totalRepayment, setTotalRepayment] = useState<number>(0);
  const [capital, setCapital] = useState<number>(0);
  const [wholeTermInterest, setWholeTermInterest] = useState<number>(0);

  const calculatePressed : FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const mortgageDetails : MortgageDetails = {
      propertyPrice: Number(formData.get("price")),
      annualInterestRate: Number(formData.get("interest")),
      deposit: Number(formData.get("deposit")),
      mortgageTermInYears: Number(formData.get("term")),
    };
    setMortgageDetails(mortgageDetails);
  }

  useEffect(() => {
    if (mortgageDetails == undefined) return;
    const monthlyPayment = calculateMonthlyPayment(mortgageDetails);
    setMonthlyPayment(monthlyPayment);
  }, [mortgageDetails]);

  useEffect(() => {
    if (mortgageDetails?.mortgageTermInYears == undefined) return;
    const totalRepayment = mortgageDetails.mortgageTermInYears * 12 * monthlyPayment;
    setTotalRepayment(totalRepayment);
  }, [mortgageDetails, monthlyPayment]);

  useEffect(() => {
    if (mortgageDetails == undefined) return;
    const { deposit, propertyPrice } = mortgageDetails;
    const capital = propertyPrice - deposit;
    setCapital(capital);
  }, [mortgageDetails]);

  useEffect(() => {
    if (mortgageDetails == undefined) return;
    const wholeTermInterest = totalRepayment - capital;
    setWholeTermInterest(wholeTermInterest);
  }, [totalRepayment, capital]);

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Mortgage Calculator</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row className="gap-x-10 pt-3">
          <Col className="border-r" md="auto">
            <Form onSubmit={calculatePressed}>
              <Form.Label htmlFor="price">Property Price</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>{currency}</InputGroup.Text>
                <Form.Control
                  id="price"
                  name="price"
                  type="number"
                  className="no-spinner"
                  step="any"
                  defaultValue={300_000}
                />
              </InputGroup>
              <Form.Label htmlFor="deposit">Deposit</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>{currency}</InputGroup.Text>
                <Form.Control
                  id="deposit"
                  name="deposit"
                  type="number"
                  className="no-spinner"
                  step="any"
                  defaultValue={50_000}
                />
              </InputGroup>

              <Form.Label htmlFor="term">Mortgage Term</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  id="term"
                  name="term"
                  type="number"
                  step="any"
                  defaultValue={15}
                />
                <InputGroup.Text>years</InputGroup.Text>
              </InputGroup>
              <Form.Label htmlFor="interest">Interest rate</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  id="interest"
                  name="interest"
                  type="number"
                  step="any"
                  className="no-spinner"
                  defaultValue={5.25}
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
              <Button className="w-full" variant="outline-primary" type="submit">
                Calculate
              </Button>
            </Form>
          </Col>
          <Col md="auto">
            <h2 className="pb-3">Results</h2>
            <Table striped="columns">
              <tbody>
                <tr className="border-b border-t">
                  <td>Monthly Payment</td>
                  <td className="text-right">{formatCurrency(monthlyPayment)}</td>
                </tr>
                <tr className="border-b">
                  <td>Total Repayment</td>
                  <td className="text-right">{formatCurrency(totalRepayment)}</td>
                </tr>
                <tr className="border-b">
                  <td>Capital</td>
                  <td className="text-right">{formatCurrency(capital)}</td>
                </tr>
                <tr className="border-b">
                  <td>Interest</td>
                  <td className="text-right">{formatCurrency(wholeTermInterest)}</td>
                </tr>
                <tr className="border-b">
                  <td>Affordability check</td>
                  <td className="text-right">{formatCurrency(921.63)}</td>
                </tr>
              </tbody>
            </Table>
          </Col>

          <Col md="auto">
            <h2 className="pb-3">Yearly Breakdown</h2>
            <Table className="max-w-52" bordered hover size="sm">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Remaining Debt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{formatCurrency(10000)}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}