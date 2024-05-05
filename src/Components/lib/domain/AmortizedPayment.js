export default class AmortizedPayment {
  constructor(
    year, month, day,
    principal, interest, additionalPayment,
    remainingBalance, accumulatedInterest) {
    this.year = year
    this.month = month
    this.day = day
    this.principal = principal
    this.interest = interest
    this.additionalPayment = additionalPayment
    this.remainingBalance = remainingBalance
    this.accumulatedInterest = accumulatedInterest
    this.isSummary = false
  }
}
