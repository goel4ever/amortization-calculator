const CurrencyFormatter = new Intl.NumberFormat('us-US', {
  style: 'currency',
  currency: 'USD',
});

export default class PaymentSummary {
  constructor(timeWindow, remainingBalance) {
    this.timeWindow = timeWindow
    this.remainingBalance = remainingBalance
    this.totalPrincipalPaid = 0.0
    this.totalInterestPaid = 0.0
    this.totalAmountPaid = 0.0
    this.numberOfPayments = 0
  }

  paymentRounded() {
    return CurrencyFormatter.format(this.totalAmountPaid)
  }

  principalPaymentRounded() {
    return CurrencyFormatter.format(this.totalAmountPaid - this.totalInterestPaid)
  }

  interestPaymentRounded() {
    return CurrencyFormatter.format(this.totalInterestPaid)
  }

  remainingBalanceRounded() {
    return CurrencyFormatter.format(this.remainingBalance)
  }
}
