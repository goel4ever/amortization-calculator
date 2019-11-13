import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Header from './Components/Layouts/Header';
import InputForm from './Components/Layouts/InputForm';
import Footer from './Components/Layouts/Footer';

class App extends React.Component {
  state = {
    monthlyPayment: 0,
    columns: [
      {
        Header: '#',
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
  };
  calculate = () => {
    const monthlyRate = 3.25 / (100 * 12);
    const principal = 330000;
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
        <Header />
        <InputForm />

        <button onClick={this.calculate} className="app-button">
          Click me!!
        </button>

        <section className="app-table">
          <ReactTable
            data={this.state.amortizationSchedule}
            columns={this.state.columns}
            showPagination={false}
            defaultPageSize={400}
          />
        </section>

        <Footer />
      </div>
    );
  }
}

export default App;
