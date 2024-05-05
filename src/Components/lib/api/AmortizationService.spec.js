import getLoanSchedule from "./AmortizationService";
import LoanRequest from "./LoanRequest";
import LoanResponse from "./LoanResponse";
import PaymentSummary from "../domain/PaymentSummary";

describe('AmortizationService', () => {
  test('throws error for invalid loan request', () => {
    const loanRequest = new LoanRequest(); // Assuming this creates an invalid request
    expect(() => getLoanSchedule(loanRequest)).toThrow("Invalid request");
  });

  test('returns LoanResponse for valid loan request', () => {
    const loanRequest = new LoanRequest(200000, 6.5, 30, 2024, 1); // Assuming this creates a valid request
    const result = getLoanSchedule(loanRequest);
    expect(result).toBeInstanceOf(LoanResponse);
  });

  test('LoanResponse has correct monthlyPayment, durationMonths, and totalPaymentSummary', () => {
    const loanRequest = new LoanRequest(2022, 0, 200000, 3.85, 15); // Assuming this creates a valid request
    const result = getLoanSchedule(loanRequest);
    expect(result.monthlyPayment).toBeCloseTo(1460.33, 2); // Replace with expected value
    expect(result.durationMonths).toBe(15 * 12);
    expect(result.totalPaymentSummary).toBeInstanceOf(PaymentSummary);
    // Add more assertions for totalPaymentSummary properties
  });

  test('LoanResponse has correct annualPaymentSummary and amortizationSchedule', () => {
    const loanRequest = new LoanRequest(2022, 0, 200000, 3.85, 15); // Assuming this creates a valid request
    const result = getLoanSchedule(loanRequest);
    expect(result.annualPaymentSummary.size).toBe(15);
    expect(result.amortizationSchedule.length).toBe(15 * 12);
    // Add more assertions for annualPaymentSummary and amortizationSchedule properties
  });
});
