import PaymentSummary from "./Models/PaymentSummary";
import LoanResponse from "./Models/LoanResponse";

const getSchedule = (loanRequest) => {
  if (!loanRequest.isValid()) {
    throw new Error("Invalid request");
  }

  const startDate = loanRequest.getStartDate()
  const monthlyRate = loanRequest.interestRate / (100 * 12);
  const durationMonths = loanRequest.durationYears * 12;

  const monthlyPayment =
    loanRequest.principalAmount * (
      monthlyRate + monthlyRate / (Math.pow(monthlyRate + 1, durationMonths) - 1)
    );

  let runningPrincipalBalance = loanRequest.principalAmount;
  const runningDate = startDate;
  const loanResponse = new LoanResponse(loanRequest, monthlyPayment, durationMonths)
  const totalPaymentSummary = new PaymentSummary("all", loanRequest.principalAmount)

  for (let i = 0; i < durationMonths; i++) {
    const interestForTheMonth = runningPrincipalBalance * monthlyRate;
    runningPrincipalBalance = Math.max(runningPrincipalBalance - (monthlyPayment - interestForTheMonth), 0);

    const currentYear = runningDate.getFullYear();
    const currentMonth = runningDate.getMonth() + 1;

    // Stats
    let currentYearLoanSummary;
    if (loanResponse.annualPaymentSummary.has(currentYear)) {
      currentYearLoanSummary = loanResponse.annualPaymentSummary.get(currentYear)
    } else {
      currentYearLoanSummary = new PaymentSummary(currentYear, runningPrincipalBalance)
      loanResponse.annualPaymentSummary.set(currentYear, currentYearLoanSummary)
    }
    currentYearLoanSummary.totalAmountPaid += monthlyPayment
    currentYearLoanSummary.totalPrincipalPaid += monthlyPayment - interestForTheMonth
    currentYearLoanSummary.totalInterestPaid += interestForTheMonth
    currentYearLoanSummary.numberOfPayments += 1
    totalPaymentSummary.totalAmountPaid += monthlyPayment
    totalPaymentSummary.totalPrincipalPaid += monthlyPayment - interestForTheMonth
    totalPaymentSummary.totalInterestPaid += interestForTheMonth

    // Payment for current month
    const currentMonthKey = currentYear + '-'
      + currentMonth.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    const monthlyPaymentSummary = new PaymentSummary(currentMonthKey, runningPrincipalBalance)
    monthlyPaymentSummary.numberOfPayments = 1
    monthlyPaymentSummary.totalPrincipalPaid = monthlyPayment - interestForTheMonth
    monthlyPaymentSummary.totalInterestPaid = interestForTheMonth
    monthlyPaymentSummary.totalAmountPaid = monthlyPayment
    loanResponse.amortizationSchedule.push(monthlyPaymentSummary)

    // +1 not needed because month starts from zero, and we've added 1 already
    runningDate.setMonth(currentMonth);
  }

  loanResponse.totalPaymentSummary = totalPaymentSummary

  return loanResponse
}

export default getSchedule
