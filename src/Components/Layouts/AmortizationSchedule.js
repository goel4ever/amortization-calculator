import React from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';

import './AmortizationSchedule.css';

export default props => (
  <div style={{ textAlign: 'center' }}>
    {/*<ButtonGroup aria-label="Basic example">*/}
    {/*  <Button variant="secondary">Monthly</Button>*/}
    {/*  <Button variant="secondary">Yearly</Button>*/}
    {/*  <Button variant="secondary">Custom</Button>*/}
    {/*</ButtonGroup>*/}

    <Table striped bordered hover size="sm" variant="dark">
      <thead>
        <tr>
          {props.columns.map(column => (
            <th key={column.accessor}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map(row => (
          <tr key={row.paymentNumber}>
            <td>{row.paymentNumber}</td>
            <td>{row.paymentRounded}</td>
            <td>{row.principalPaymentRounded}</td>
            <td>{row.interestPaymentRounded}</td>
            <td>{row.principalBalanceRounded}</td>
            <td>{row.accInterestRounded}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);
