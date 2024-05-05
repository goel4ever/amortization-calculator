export default class LoanResponse {
  constructor(loanRequest, monthlyPayment, numberOfPayments) {
    this.loanRequest = loanRequest
    this.monthlyPayment = monthlyPayment
    this.numberOfPayments = numberOfPayments
    this.totalPaymentSummary = null
    this.annualPaymentSummary = new Map()
    this.amortizationSchedule = []
    this.totalCostOfLoan = null
    this.payOffDate = null
  }

  setTotalPaymentSummary(paymentSummary) {
    this.totalPaymentSummary = paymentSummary;
  }

  addAnnualPaymentSummary(year, paymentSummary) {
    this.annualPaymentSummary.set(year, paymentSummary);
  }

  addAmortizationSchedule(paymentSummary) {
    this.amortizationSchedule.push(paymentSummary);
  }

  setTotalCostOfLoan(totalCost) {
    this.totalCostOfLoan = totalCost;
  }

  setPayOffDate(date) {
    this.payOffDate = date;
  }
}
