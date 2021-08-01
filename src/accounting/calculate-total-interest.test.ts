import {
  calculateTotalInterest,
  calculateTotalInterestForPayoffs,
} from "./calculate-total-interest";
import { Payment } from "../types/Payment";
import { LoanPayoff } from "../types/LoanPayoff";

const payments: Payment[] = [
  {
    date: new Date(),
    interestPaid: 18.45,
    amount: 2632,
    principlePaid: 2613.55,
    principleRemaining: 3710.45,
  },
  {
    date: new Date(),
    interestPaid: 10.82,
    amount: 2632,
    principlePaid: 2621.18,
    principleRemaining: 1089.27,
  },
  {
    date: new Date(),
    interestPaid: 3.18,
    amount: 1092.45,
    principlePaid: 1089.27,
    principleRemaining: 0,
  },
];

const loanPayoffs: LoanPayoff[] = [
  {
    loanName: "foo",
    payments: [
      {
        date: new Date(),
        interestPaid: 116.45,
        amount: 2632,
        principlePaid: 2613.55,
        principleRemaining: 3710.45,
      },
      {
        date: new Date(),
        interestPaid: 32.82,
        amount: 2632,
        principlePaid: 2621.18,
        principleRemaining: 1089.27,
      },
      {
        date: new Date(),
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
        date: new Date(),
        interestPaid: 6.45,
        amount: 2632,
        principlePaid: 2613.55,
        principleRemaining: 3710.45,
      },
      {
        date: new Date(),
        interestPaid: 3.84,
        amount: 2632,
        principlePaid: 2621.18,
        principleRemaining: 1089.27,
      },
      {
        date: new Date(),
        interestPaid: 79.16,
        amount: 1092.45,
        principlePaid: 1089.27,
        principleRemaining: 0,
      },
    ],
  },
];

describe("calculateTotalInterest", () => {
  it("sums up the interest paid over all the payments", () => {
    expect(calculateTotalInterest(payments)).toEqual(32.45);
  });
});

describe("calculateTotalInterestForPayoffs", () => {
  it("sums up the interest paid over all the payments across all the payoffs", () => {
    expect(calculateTotalInterestForPayoffs(loanPayoffs)).toEqual(316.9);
  });
});
