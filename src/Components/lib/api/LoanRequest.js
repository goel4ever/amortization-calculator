export default class LoanRequest {
  constructor(
    principalAmount = 40000,
    interestRate = 3.85,
    durationYears = 15,
    loanStartYear = new Date().getFullYear(),
    loanStartMonth = new Date().getMonth(),
    extraMonthlyPayment = 0) {
    this.principalAmount = principalAmount
    this.interestRate = interestRate
    this.durationYears = durationYears
    this.loanStartYear = loanStartYear
    this.loanStartMonth = loanStartMonth
    this.extraMonthlyPayment = extraMonthlyPayment
  }

  isValidPrincipalAmount() {
    return this.principalAmount > 0 && this.principalAmount <= 10_000_000;
  }

  isValidInterestRate() {
    return this.interestRate > 0 && this.interestRate <= 50;
  }

  isValidDurationYears() {
    return this.durationYears > 0 && this.durationYears <= 50;
  }

  isValid() {
    return this.isValidPrincipalAmount() && this.isValidInterestRate() && this.isValidDurationYears();
  }

  getStartDate() {
    if (!this.isValid()) {
      throw new Error("Invalid loan request");
    }
    return new Date(this.loanStartYear, this.loanStartMonth);
  }
}
