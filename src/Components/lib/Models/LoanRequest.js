export default class LoanRequest {
  constructor(
    principalAmount = 40000,
    interestRate = 3.85,
    durationYears = 15,
    loanStartYear,
    loanStartMonth,
    extraMonthlyPayment = 0) {
    this.principalAmount = principalAmount || 0
    this.interestRate = interestRate || 0.0
    this.durationYears = durationYears || 0
    this.loanStartYear = loanStartYear
    this.loanStartMonth = loanStartMonth
    this.extraMonthlyPayment = extraMonthlyPayment || 0
  }

  isValid() {
    if (this.principalAmount < 0 || this.interestRate < 0 || this.durationYears < 0 || this.durationYears > 40) {
      return false
    }

    if (!this.loanStartMonth || !this.loanStartYear) {
      const date = new Date()
      this.loanStartMonth = date.getMonth()
      this.loanStartYear = date.getFullYear()
    }
    return true
  }

  getStartDate() {
    if (this.isValid()) {
      return new Date(this.loanStartYear, this.loanStartMonth)
    } else {
      return new Date()
    }
  }
}
