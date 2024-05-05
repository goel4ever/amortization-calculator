import React from 'react';
import {Card, Col, Form, Row} from 'react-bootstrap';
import './Summary.css';

const Summary = props => (
  <Card>
    <Card.Header>Summary</Card.Header>
    <Card.Body>
      <Form>
        <Form.Group as={Row} controlId="summaryTitles">
          <Col sm="3">
            <Form.Label column>Monthly payment</Form.Label>
          </Col>
          <Col sm="3">
            <Form.Label column>Total interest paid</Form.Label>
          </Col>
          <Col sm="3">
            <Form.Label column>Total cost of loan</Form.Label>
          </Col>
          <Col sm="3">
            <Form.Label column>Payoff date</Form.Label>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="summaryValues">
          <Col sm="3">
            <Form.Label column>${props.monthlyPayment.toFixed(2)}</Form.Label>
          </Col>
          <Col sm="3">
            <Form.Label column>${props.totalInterestPaid.toFixed(2)}</Form.Label>
          </Col>
          <Col sm="3">
            <Form.Label column>${props.sumOfPayments.toFixed(2)}</Form.Label>
          </Col>
          <Col sm="3">
            <Form.Label column>{props.payoffDate}</Form.Label>
          </Col>
        </Form.Group>
      </Form>
    </Card.Body>
  </Card>
);

export default Summary
