import React from 'react';
import './App.css';

import Header from './Components/Layouts/Header';
import InputForm from './Components/Layouts/InputForm';
import AmortizationSchedule from './Components/Layouts/AmortizationSchedule';
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
  calculate = ({ principal, rate, duration, startDate, extraPayment }) => {
    const monthlyRate = rate / (100 * 12);
    // const principal = 330000;
    const durationMonths = duration * 12;

    // const paymentAmountPerPeriod =
    //   initialPrincipal *
    //   ((interestRatePerPeriod *
    //     Math.pow(interestRatePerPeriod + 1, totalNumberOfPayments)) /
    //     (Math.pow(interestRatePerPeriod + 1, totalNumberOfPayments) - 1));

    const monthlyPayment =
      principal *
      (monthlyRate +
        monthlyRate / (Math.pow(monthlyRate + 1, durationMonths) - 1));

    const amortizationSchedule = [];
    for (let i = 0; i < durationMonths; i++) {
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
        <InputForm onSubmit={this.calculate} />

        <AmortizationSchedule
          data={this.state.amortizationSchedule}
          columns={this.state.columns}
          showPagination={false}
          defaultPageSize={400}
        />

        <Footer />
      </div>
    );
  }
}

export default App;
