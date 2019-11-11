import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class App extends React.Component {
  state = {
    monthlyPayment: 0,
    columns: [
      {
        Header: 'paymentNumber',
        accessor: 'paymentNumber',
      },
      {
        Header: 'payment',
        accessor: 'paymentRounded',
      },
      {
        Header: 'principalPayment',
        accessor: 'principalPaymentRounded',
      },
      {
        Header: 'interestPayment',
        accessor: 'interestPaymentRounded',
      },
      {
        Header: 'principalBalance',
        accessor: 'principalBalanceRounded',
      },
      {
        Header: 'accInterest',
        accessor: 'accInterestRounded',
      },
    ],
    amortizationSchedule: [],
  };
  calculate = () => {
    const monthlyRate = 3.25 / (100 * 12);
    const principal = 300000;
    const yearsDuration = 30;

    // const paymentAmountPerPeriod =
    //   initialPrincipal *
    //   ((interestRatePerPeriod *
    //     Math.pow(interestRatePerPeriod + 1, totalNumberOfPayments)) /
    //     (Math.pow(interestRatePerPeriod + 1, totalNumberOfPayments) - 1));

    const monthlyPayment =
      principal *
      (monthlyRate +
        monthlyRate / (Math.pow(monthlyRate + 1, yearsDuration * 12) - 1));

    const amortizationSchedule = [];
    for (let i = 0; i < yearsDuration * 12; i++) {
      const prevPrincipal =
        i === 0 ? principal : amortizationSchedule[i - 1].principalBalance;
      const interestPayment = prevPrincipal * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      const principalBalance = Math.max(prevPrincipal - principalPayment, 0);
      const accInterest =
        (i === 0 ? 0 : amortizationSchedule[i - 1].accInterest) +
        interestPayment;
      amortizationSchedule.push({
        paymentNumber: i + 1,
        payment: monthlyPayment,
        principalBalance: principalBalance,
        interestPayment: interestPayment,
        principalPayment: principalPayment,
        accInterest: accInterest,
        paymentRounded: Math.floor(monthlyPayment * 100) / 100.0,
        interestPaymentRounded: Math.floor(interestPayment * 100) / 100.0,
        principalPaymentRounded: Math.floor(principalPayment * 100) / 100.0,
        principalBalanceRounded: Math.floor(principalBalance * 100) / 100.0,
        accInterestRounded: Math.floor(accInterest * 100) / 100.0,
      });
    }
    this.setState({
      monthlyPayment,
      amortizationSchedule,
    });
  };
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <p>
            <input type="text" placeholder="Principal Amount" />
            <input type="text" placeholder="Rate of interest" />
            <input type="text" placeholder="Duration in years" />
            <button onClick={this.calculate} className="app-button">
              Click me!!
            </button>
          </p>
        </header>
        <section className="app-table">
          <ReactTable
            data={this.state.amortizationSchedule}
            columns={this.state.columns}
            showPagination={false}
            defaultPageSize={400}
          />
        </section>
      </div>
    );
  }
}

export default App;
