import React from 'react';
import {Tab, Table, Tabs} from 'react-bootstrap';

import './AmortizationSchedule.css';

const AmortizationSchedule = props => (
  <div style={{ textAlign: 'center' }}>
    <Tabs defaultActiveKey="monthly"
          id="amortized-payments-tab"
          className="mb-3"
          justify>
      <Tab eventKey="monthly" title="Monthly Breakdown">
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
          <tr>
            {props.columns.map(column => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {props.data.amortizationSchedule.map(row => (
            <tr key={row.timeWindow}>
              <td>{row.timeWindow}</td>
              <td>{row.principalPaymentRounded()}</td>
              <td>{row.interestPaymentRounded()}</td>
              <td>{row.paymentRounded()}</td>
              <td>{row.remainingBalanceRounded()}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Tab>

      <Tab eventKey="yearly" title="Yearly">
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
          <tr>
            {props.columns.map(column => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {Array.from(props.data.annualPaymentSummary.values()).map(row => (
            <tr key={row.timeWindow}>
              <td>{row.timeWindow}</td>
              <td>{row.principalPaymentRounded()}</td>
              <td>{row.interestPaymentRounded()}</td>
              <td>{row.paymentRounded()}</td>
              <td>{row.remainingBalanceRounded()}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Tab>

      <Tab eventKey="custom" title="Better Visual Formatting" disabled>
        Custom
      </Tab>
    </Tabs>
  </div>
);

export default AmortizationSchedule
