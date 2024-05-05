import PaymentSummary from "../domain/PaymentSummary";
import LoanResponse from "./LoanResponse";

const calculateMonthlyPayment = (loanRequest, monthlyRate, durationMonths) => {
  return loanRequest.principalAmount * (
    monthlyRate + monthlyRate / (Math.pow(monthlyRate + 1, durationMonths) - 1)
  );
};

const createPaymentSummary = (key, remainingBalance) => {
  const paymentSummary = new PaymentSummary(key, remainingBalance);
  paymentSummary.numberOfPayments = 1;
  return paymentSummary;
};

const updatePaymentSummary = (paymentSummary, monthlyPayment, interestForTheMonth) => {
  paymentSummary.totalAmountPaid += monthlyPayment;
  paymentSummary.totalPrincipalPaid += monthlyPayment - interestForTheMonth;
  paymentSummary.totalInterestPaid += interestForTheMonth;
};

const updateLoanResponse = (loanResponse, currentYear, currentYearLoanSummary, monthlyPaymentSummary) => {
  if (!loanResponse.annualPaymentSummary.has(currentYear)) {
    loanResponse.annualPaymentSummary.set(currentYear, currentYearLoanSummary);
  }
  loanResponse.amortizationSchedule.push(monthlyPaymentSummary);
};

const getLoanSchedule = (loanRequest) => {
  if (!loanRequest.isValid()) {
    throw new Error("Invalid request");
  }

  const startDate = loanRequest.getStartDate();
  const monthlyRate = loanRequest.interestRate / (100 * 12);
  const durationMonths = loanRequest.durationYears * 12;
  const monthlyPayment = calculateMonthlyPayment(loanRequest, monthlyRate, durationMonths);

  let runningPrincipalBalance = loanRequest.principalAmount;
  const runningDate = startDate;
  const loanResponse = new LoanResponse(loanRequest, monthlyPayment, durationMonths);
  const totalPaymentSummary = createPaymentSummary("all", loanRequest.principalAmount);

  for (let i = 0; i < durationMonths; i++) {
    const currentYear = runningDate.getFullYear();
    const currentMonth = runningDate.getMonth() + 1;
    const interestForTheMonth = runningPrincipalBalance * monthlyRate;
    runningPrincipalBalance = Math.max(runningPrincipalBalance - (monthlyPayment - interestForTheMonth), 0);

    const currentYearLoanSummary = loanResponse.annualPaymentSummary.get(currentYear) || createPaymentSummary(currentYear, runningPrincipalBalance);
    updatePaymentSummary(currentYearLoanSummary, monthlyPayment, interestForTheMonth);
    updatePaymentSummary(totalPaymentSummary, monthlyPayment, interestForTheMonth);

    const currentMonthKey = currentYear + '-' + currentMonth.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    const monthlyPaymentSummary = createPaymentSummary(currentMonthKey, runningPrincipalBalance);
    updatePaymentSummary(monthlyPaymentSummary, monthlyPayment, interestForTheMonth);

    updateLoanResponse(loanResponse, currentYear, currentYearLoanSummary, monthlyPaymentSummary);

    runningDate.setMonth(currentMonth);
  }

  loanResponse.totalPaymentSummary = totalPaymentSummary;

  return loanResponse;
};

export default getLoanSchedule;
