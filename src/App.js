import React from 'react';
import './App.css';

import Header from './Components/Layouts/Header';
import InputForm from './Components/Layouts/InputForm';
import AmortizationSchedule from './Components/Layouts/AmortizationSchedule';
import Footer from './Components/Layouts/Footer';
import LoanRequest from "./Components/lib/Models/LoanRequest";
import getSchedule from "./Components/lib/AmortizationService";

const CurrencyFormatter = new Intl.NumberFormat('us-US', {
  style: 'currency',
  currency: 'USD',
});

class App extends React.Component {
  state = {
    monthlyPayment: 0,
    columns: [
      {
        Header: 'Month',
        accessor: 'paymentNumber',
      },
      {
        Header: 'Payment',
        accessor: 'paymentRounded',
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
        Header: 'Balance',
        accessor: 'principalBalanceRounded',
      },
      {
        Header: 'Accumulated Interest',
        accessor: 'accInterestRounded',
      },
    ],
    amortizationSchedule: [],
    currentYear: (new Date()).getFullYear(),
    developer: 'goel4ever'
  };
  calculatePayments = ({ principal, rate, duration, startDate, extraPayment }) => {

    if (principal < 0 || rate < 0 || duration < 0 || duration > 40) {
      return;
    }

    const loanRequest = new LoanRequest(principal, rate, duration)
    const loanResponse = getSchedule(loanRequest)
    console.log(loanResponse)

    const monthlyRate = rate / (100 * 12);
    const durationMonths = duration * 12;

    // const paymentAmountPerPeriod =
    //   initialPrincipal *
    //   ((interestRatePerPeriod *
    //     Math.pow(interestRatePerPeriod + 1, totalNumberOfPayments)) /
    //     (Math.pow(interestRatePerPeriod + 1, totalNumberOfPayments) - 1));

    const monthlyPayment =
      principal * (monthlyRate + monthlyRate / (Math.pow(monthlyRate + 1, durationMonths) - 1));

    const stats = {
      totalAccruedInterest: 0.0,
      payments: new Map(),
      principals: new Map(),
      interests: new Map(),
    }
    const amortizationSchedule = [];
    let runningPrincipalBalance = principal;
    const runningDate = startDate;

    for (let i = 0; i < durationMonths; i++) {
      const interestForTheMonth = runningPrincipalBalance * monthlyRate;
      runningPrincipalBalance = Math.max(runningPrincipalBalance - (monthlyPayment - interestForTheMonth), 0);

      const currentYear = runningDate.getFullYear();
      const currentMonth = runningDate.getMonth() + 1;

      stats.totalAccruedInterest += interestForTheMonth;
      if (!stats.interests.has(currentYear)) {
        stats.payments.set(currentYear, 0.0);
        stats.principals.set(currentYear, 0.0);
        stats.interests.set(currentYear, 0.0);
      }
      stats.payments.set(currentYear, stats.payments.get(currentYear) + monthlyPayment);
      stats.principals.set(currentYear, stats.principals.get(currentYear) + (monthlyPayment - interestForTheMonth));
      stats.interests.set(currentYear, stats.interests.get(currentYear) + interestForTheMonth);

      amortizationSchedule.push({
        paymentNumber: currentYear + '-'
            + currentMonth.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              }),
        payment: monthlyPayment,
        principalBalance: runningPrincipalBalance,
        interestPayment: interestForTheMonth,
        principalPayment: monthlyPayment - interestForTheMonth,
        paymentRounded: CurrencyFormatter.format(monthlyPayment),
        interestPaymentRounded: CurrencyFormatter.format(interestForTheMonth),
        principalPaymentRounded: CurrencyFormatter.format(monthlyPayment - interestForTheMonth),
        principalBalanceRounded: CurrencyFormatter.format(runningPrincipalBalance),
        accInterestRounded: CurrencyFormatter.format(stats.totalAccruedInterest),
      });

      // +1 not needed because month starts from zero, and we've added 1 already
      runningDate.setMonth(currentMonth);
    }
    this.setState({
      monthlyPayment: loanResponse.monthlyPayment,
      amortizationSchedule: loanResponse.amortizationSchedule,
    });
  };
  render() {
    return (
      <div className="app">
        <Header />
        <InputForm onSubmit={this.calculatePayments} />

        <AmortizationSchedule
          data={this.state.amortizationSchedule}
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
