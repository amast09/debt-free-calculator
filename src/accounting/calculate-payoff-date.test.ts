import { LoanPayoff } from "../types/LoanPayoff";
import { calculatePayoffDate } from "./calculate-payoff-date";

const lastPayment = new Date("2022-01-01");

const loanPayoffs: LoanPayoff[] = [
  {
    loanName: "foo",
    payments: [
      {
        date: new Date("2021-01-01"),
        interestPaid: 116.45,
        amount: 2632,
        principlePaid: 2613.55,
        principleRemaining: 3710.45,
      },
      {
        date: lastPayment,
        interestPaid: 32.82,
        amount: 2632,
        principlePaid: 2621.18,
        principleRemaining: 1089.27,
      },
      {
        date: new Date("2021-02-01"),
        interestPaid: 78.18,
        amount: 1092.45,
        principlePaid: 1089.27,
        principleRemaining: 0,
      },
    ],
  },
  {
    loanName: "bar",
    payments: [
      {
        date: new Date("2021-03-01"),
        interestPaid: 6.45,
        amount: 2632,
        principlePaid: 2613.55,
        principleRemaining: 3710.45,
      },
      {
        date: new Date("2021-04-01"),
        interestPaid: 3.84,
        amount: 2632,
        principlePaid: 2621.18,
        principleRemaining: 1089.27,
      },
      {
        date: new Date("2021-05-01"),
        interestPaid: 79.16,
        amount: 1092.45,
        principlePaid: 1089.27,
        principleRemaining: 0,
      },
    ],
  },
];

describe("calculatePayoffDate", () => {
  it("returns the last payment date in the loan payoffs", () => {
    expect(calculatePayoffDate(loanPayoffs)).toEqual(lastPayment);
  });

  it("returns today if given no loan payoffs", () => {
    expect(calculatePayoffDate([]).toDateString()).toEqual(
      new Date().toDateString()
    );
  });

  it("returns today if loan payoffs have no payments", () => {
    expect(
      calculatePayoffDate([
        { loanName: "foo", payments: [] },
        { loanName: "bar", payments: [] },
      ])
    ).toEqual(new Date());
  });
});
