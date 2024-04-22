import { Container, Row, Col } from '@/utils/ReactBootstrapAdapter/reactBootstrapAdapter';

import MortgageDetailForm from './MortgageDetailForm';
import ResultsTable from './ResultsTable';
import YearlyBreakdown from './YearlyBreakdown';
import { Suspense } from 'react';

/**
 * Main page of the Mortgage Calculator
 * 
 * TODO: Needs to use a validation library like Zod to allow for validation on the client and the server
 * TODO: At the moment the server crashes the whole app with an exception when a validation error occurs. Should update UI to show a validation message instead. Left this to tie in with a validation library like Zod
 * 
 * @returns main page
 */
export default async function MortgageCalculator() {

  return (
    <Container>
      <Row className="gap-x-10 pt-3">
        <Col className="border-r" md="auto">
          <Suspense fallback={<div>Loading ...</div>}>
            <MortgageDetailForm />
          </Suspense>
        </Col>
        <Col md="auto">
          <ResultsTable />
        </Col>
        <Col md="auto">
          <YearlyBreakdown />
        </Col>
      </Row>
    </Container>
  )
}