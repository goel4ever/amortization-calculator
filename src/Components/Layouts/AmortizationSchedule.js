import React from 'react';

import './AmortizationSchedule.css';

export default props => (
  <section className="app-table">
    <table>
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
    </table>
  </section>
);
