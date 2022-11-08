import React from 'react';
import {Button, ButtonGroup, Tab, Table, Tabs} from 'react-bootstrap';

import './AmortizationSchedule.css';

const AmortizationSchedule = props => (
  <div style={{ textAlign: 'center' }}>
    {/*<Tabs defaultActiveKey="profile"*/}
    {/*      id="uncontrolled-tab-example"*/}
    {/*      className="mb-3">*/}
    {/*  <Tab eventKey="home" title="Home" variant="secondary">*/}
    {/*    Monthly*/}
    {/*  </Tab>*/}
    {/*  <Tab eventKey="profile" title="Profile" variant="secondary">*/}
    {/*    Yearly*/}
    {/*  </Tab>*/}
    {/*  <Tab eventKey="contact" title="Contact" disabled variant="secondary">*/}
    {/*    Custom*/}
    {/*  </Tab>*/}
    {/*</Tabs>*/}

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
          <tr key={row.timeWindow}>
            <td>{row.timeWindow}</td>
            <td>{row.paymentRounded()}</td>
            <td>{row.principalPaymentRounded()}</td>
            <td>{row.interestPaymentRounded()}</td>
            <td>{row.remainingBalanceRounded()}</td>
            <td>{row.accInterestRounded}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default AmortizationSchedule
