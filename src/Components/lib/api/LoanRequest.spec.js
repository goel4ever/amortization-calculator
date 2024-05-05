import LoanRequest from "./LoanRequest";

describe('LoanRequest', () => {
  test('isValid returns false for invalid loan request', () => {
    var loanRequest = new LoanRequest(
      -1, 5, 15
    );
    expect(loanRequest.isValid()).toBe(false);

    loanRequest = new LoanRequest(
      0, 5, 15
    );
    expect(loanRequest.isValid()).toBe(false);

    loanRequest = new LoanRequest(
      10_000_001, 5, 15
    );
    expect(loanRequest.isValid()).toBe(false);

    loanRequest = new LoanRequest(
      1000, -1, 15
    );
    expect(loanRequest.isValid()).toBe(false);

    loanRequest = new LoanRequest(
      1000, 0, 15
    );
    expect(loanRequest.isValid()).toBe(false);

    loanRequest = new LoanRequest(
      1000, 51, 15
    );
    expect(loanRequest.isValid()).toBe(false);

    loanRequest = new LoanRequest(
      1000, 5, -1
    );
    expect(loanRequest.isValid()).toBe(false);

    loanRequest = new LoanRequest(
      1000, 5, 0
    );
    expect(loanRequest.isValid()).toBe(false);

    loanRequest = new LoanRequest(
      1000, 5, 51
    );
    expect(loanRequest.isValid()).toBe(false);
  });

  test('isValid returns true for valid principal amount', () => {
    var loanRequest = new LoanRequest(
      20_000, 5, 30
    );
    expect(loanRequest.isValid()).toBe(true);

    loanRequest = new LoanRequest(
      10_000_000, 5, 30
    );
    expect(loanRequest.isValid()).toBe(true);
  });

  test('isValid returns true for valid interest rate', () => {
    var loanRequest = new LoanRequest(
      20_000, 0.1, 30
    );
    expect(loanRequest.isValid()).toBe(true);

    loanRequest = new LoanRequest(
      20_000, 5, 30
    );
    expect(loanRequest.isValid()).toBe(true);

    loanRequest = new LoanRequest(
      20_000, 7.92, 30
    );
    expect(loanRequest.isValid()).toBe(true);

    loanRequest = new LoanRequest(
      20_000, 50, 30
    );
    expect(loanRequest.isValid()).toBe(true);
  });

  test('isValid returns true for valid duration years', () => {
    var loanRequest = new LoanRequest(
      20_000, 5, 1
    );
    expect(loanRequest.isValid()).toBe(true);

    loanRequest = new LoanRequest(
      20_000, 5, 30
    );
    expect(loanRequest.isValid()).toBe(true);

    loanRequest = new LoanRequest(
      20_000, 5, 50
    );
    expect(loanRequest.isValid()).toBe(true);
  });

  test('isValid returns true for default values', () => {
    var loanRequest = new LoanRequest();
    expect(loanRequest.isValid()).toBe(true);
  });

  test('getStartDate returns correct date for valid loan request', () => {
    var startDate = new LoanRequest(
      2000, 6.5, 30, 2024, 1
    ).getStartDate();
    expect(startDate.getFullYear()).toBe(2024);
    expect(startDate.getMonth()).toBe(1);

    startDate = new LoanRequest(
      2000, 6.5, 30, 2024, 15
    ).getStartDate();
    expect(startDate.getFullYear()).not.toBe(2024);
    expect(startDate.getMonth()).not.toBe(15);
    expect(startDate.getFullYear()).toBe(2025);
    expect(startDate.getMonth()).toBe(3);

    startDate = new LoanRequest(
      2000, 6.5, 30
    ).getStartDate();
    expect(startDate.getFullYear()).toBe(new Date().getFullYear());
    expect(startDate.getMonth()).toBe(new Date().getMonth());
  });
});
