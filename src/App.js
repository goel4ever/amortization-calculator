import React from 'react';
import './App.css';

import Header from './Components/Layouts/Header';
import InputForm from './Components/Layouts/InputForm';
import AmortizationSchedule from './Components/Layouts/AmortizationSchedule';
import Footer from './Components/Layouts/Footer';
import LoanRequest from "./Components/lib/Models/LoanRequest";
import getSchedule from "./Components/lib/AmortizationService";

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
    currentYear: (new Date()).getFullYear(),
    developer: 'goel4ever'
  };
  calculatePayments = ({ principal, rate, duration, startDate, extraPayment }) => {

    if (principal < 0 || rate < 0 || duration < 0 || duration > 40) {
      return;
    }

    const loanRequest = new LoanRequest(principal, rate, duration)
    const loanResponse = getSchedule(loanRequest)

    this.setState({
      monthlyPayment: loanResponse.monthlyPayment,
      amortizationSchedule: loanResponse.amortizationSchedule,
      loanResponse,
    });
  };
  render() {
    return (
      <div className="app">
        <Header />
        <InputForm onSubmit={this.calculatePayments} />

        <AmortizationSchedule
          data={this.state.loanResponse}
          columns={this.state.columns}
          showPagination={false}
          defaultPageSize={400}
        />

        <Footer currentYear={this.state.currentYear } developer={this.state.developer} />
      </div>
    );
  }
}

export default App;
