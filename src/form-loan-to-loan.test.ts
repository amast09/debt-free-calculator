import { formLoanToLoan } from "./form-loan-to-loan";

describe("formLoanToLoan", () => {
  it("transforms a form loan into real loan", () => {
    expect(
      formLoanToLoan({
        id: 1,
        balance: "100",
        minimumPayment: "10",
        interestRate: "3.2",
        name: "foobar",
      })
    ).toEqual({
      id: 1,
      balance: 100,
      minimumPayment: 10,
      interestRate: 3.2,
      name: "foobar",
    });
  });
});
