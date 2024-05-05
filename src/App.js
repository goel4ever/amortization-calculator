import React from 'react';
import ReactGA from 'react-ga4';
import './App.css';

import Header from './Components/Layouts/Header';
import InputForm from './Components/Layouts/InputForm';
import AmortizationSchedule from './Components/Layouts/AmortizationSchedule';
import Footer from './Components/Layouts/Footer';
import LoanRequest from "./Components/lib/api/LoanRequest";
import getLoanSchedule from "./Components/lib/api/AmortizationService";
import {Col, Container, Row} from "react-bootstrap";
import Summary from "./Components/Layouts/Summary";

class App extends React.Component {
  state = {
    monthlyPayment: 0,
    columns: [
      {
        Header: 'Month',
        accessor: 'paymentNumber',
      },
      {
        Header: 'Principal',
        accessor: 'principalPaymentRounded',
      },
      {
        Header: 'Interest',
        accessor: 'interestPaymentRounded',
      },
      {
        Header: 'Total Payments',
        accessor: 'paymentRounded',
      },
      {
        Header: 'Remaining Balance',
        accessor: 'principalBalanceRounded',
      },
    ],
    amortizationSchedule: [],
    loanResponse: {
      amortizationSchedule: [],
      annualPaymentSummary: new Map(),
    },
    totalInterestPaid: 0,
    totalAmountPaid: 0,
    payoffDate: '',
    currentYear: (new Date()).getFullYear(),
    developer: 'goel4ever'
  }
  calculatePayments = ({ principal, rate, duration, startDate, extraPayment }) => {

    if (principal < 0 || rate < 0 || duration < 0 || duration > 40) {
      return;
    }

    const startDateObj = new Date(startDate)
    const loanRequest = new LoanRequest(
      principal,
      rate,
      duration,
      startDateObj.getFullYear(),
      startDateObj.getMonth()
    )
    const loanResponse = getLoanSchedule(loanRequest)

    this.setState({
      monthlyPayment: loanResponse.monthlyPayment,
      amortizationSchedule: loanResponse.amortizationSchedule,
      totalInterestPaid: loanResponse.totalPaymentSummary.totalInterestPaid,
      totalAmountPaid: loanResponse.totalPaymentSummary.totalAmountPaid,
      payoffDate: loanResponse.payOffDate,
      loanResponse,
    });
  };
  render() {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search,
      title: 'Amortization Calculator Home Page',
    });

    return (
      <Container fluid>
        <Row>
          <Col><Header developer={this.state.developer} /></Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col sm="3">
            <InputForm onSubmit={this.calculatePayments} />
          </Col>
          <Col sm="9">
            <Summary
              monthlyPayment={this.state.monthlyPayment}
              totalInterestPaid={this.state.totalInterestPaid}
              sumOfPayments={this.state.totalAmountPaid}
              payoffDate={this.state.payoffDate}
            />

            <br />

            <AmortizationSchedule
              data={this.state.loanResponse}
              columns={this.state.columns}
              showPagination={false}
              defaultPageSize={400}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Footer currentYear={this.state.currentYear } developer={this.state.developer} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
