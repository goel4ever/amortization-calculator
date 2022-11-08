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
}
