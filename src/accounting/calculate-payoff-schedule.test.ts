import { PayoffStrategy } from "../types/PayoffStrategy";
import { Loan } from "../types/Loan";
import shuffle from "lodash/shuffle";
import { DateTime } from "luxon";
import {
  calculatePayoffSchedule,
  LoanPayoff,
} from "./calculate-payoff-schedule";

const loan1: Loan = {
  id: 0,
  name: "foo",
  balance: 6324,
  minimumPayment: 89,
  interestRate: 3.5,
};

const loan2: Loan = {
  id: 1,
  name: "bar",
  balance: 21304,
  minimumPayment: 367,
  interestRate: 4.6,
};

const loans = shuffle([loan1, loan2]);
const monthlyPayment = 2999;
const now = DateTime.now().startOf("month").startOf("day");

describe("calculatePayoffSchedule", () => {
  describe("when applying the snowball strategy", () => {
    it("pays off the loans by lowest balance then by lowest interest rate", () => {
      const expectedLoanPayoff: LoanPayoff[] = [
        {
          loanName: "foo",
          payments: [
            {
              date: now.plus({ month: 1 }).toJSDate(),
              interestPaid: 18.45,
              amount: 2632,
              principlePaid: 2613.55,
              principleRemaining: 3710.45,
            },
            {
              date: now.plus({ month: 2 }).toJSDate(),
              interestPaid: 10.82,
              amount: 2632,
              principlePaid: 2621.18,
              principleRemaining: 1089.27,
            },
            {
              date: now.plus({ month: 3 }).toJSDate(),
              interestPaid: 3.18,
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
              date: now.plus({ month: 1 }).toJSDate(),
              interestPaid: 81.67,
              amount: 367,
              principlePaid: 285.33,
              principleRemaining: 21018.67,
            },
            {
              date: now.plus({ month: 2 }).toJSDate(),
              interestPaid: 80.57,
              amount: 367,
              principlePaid: 286.43,
              principleRemaining: 20732.24,
            },
            {
              date: now.plus({ month: 3 }).toJSDate(),
              interestPaid: 79.47,
              amount: 1906.55,
              principlePaid: 1827.08,
              principleRemaining: 18905.16,
            },
            {
              date: now.plus({ month: 4 }).toJSDate(),
              interestPaid: 72.47,
              amount: 2999,
              principlePaid: 2926.53,
              principleRemaining: 15978.63,
            },
            {
              date: now.plus({ month: 5 }).toJSDate(),
              interestPaid: 61.25,
              amount: 2999,
              principlePaid: 2937.75,
              principleRemaining: 13040.88,
            },
            {
              date: now.plus({ month: 6 }).toJSDate(),
              interestPaid: 49.99,
              amount: 2999,
              principlePaid: 2949.01,
              principleRemaining: 10091.87,
            },
            {
              date: now.plus({ month: 7 }).toJSDate(),
              interestPaid: 38.69,
              amount: 2999,
              principlePaid: 2960.31,
              principleRemaining: 7131.56,
            },
            {
              date: now.plus({ month: 8 }).toJSDate(),
              interestPaid: 27.34,
              amount: 2999,
              principlePaid: 2971.66,
              principleRemaining: 4159.9,
            },
            {
              date: now.plus({ month: 9 }).toJSDate(),
              interestPaid: 15.95,
              amount: 2999,
              principlePaid: 2983.05,
              principleRemaining: 1176.85,
            },
            {
              date: now.plus({ month: 10 }).toJSDate(),
              interestPaid: 4.51,
              amount: 1181.36,
              principlePaid: 1176.85,
              principleRemaining: 0,
            },
          ],
        },
      ];

      expect(
        calculatePayoffSchedule({
          loans,
          monthlyPayment,
          payoffStrategy: PayoffStrategy.Snowball,
        })
      ).toEqual(expectedLoanPayoff);
    });
  });

  describe("when applying the avalanche strategy", () => {
    it("pays off the loans by lowest interest rate then by lowest balance", () => {
      const expectedLoanPayoff: LoanPayoff[] = [
        {
          loanName: "bar",
          payments: [
            {
              date: now.plus({ month: 1 }).toJSDate(),
              interestPaid: 81.67,
              amount: 2910,
              principlePaid: 2828.33,
              principleRemaining: 18475.67,
            },
            {
              date: now.plus({ month: 2 }).toJSDate(),
              interestPaid: 70.82,
              amount: 2910,
              principlePaid: 2839.18,
              principleRemaining: 15636.49,
            },
            {
              date: now.plus({ month: 3 }).toJSDate(),
              interestPaid: 59.94,
              amount: 2910,
              principlePaid: 2850.06,
              principleRemaining: 12786.43,
            },
            {
              date: now.plus({ month: 4 }).toJSDate(),
              interestPaid: 49.01,
              amount: 2910,
              principlePaid: 2860.99,
              principleRemaining: 9925.44,
            },
            {
              date: now.plus({ month: 5 }).toJSDate(),
              interestPaid: 38.05,
              amount: 2910,
              principlePaid: 2871.95,
              principleRemaining: 7053.49,
            },
            {
              date: now.plus({ month: 6 }).toJSDate(),
              interestPaid: 27.04,
              amount: 2910,
              principlePaid: 2882.96,
              principleRemaining: 4170.53,
            },
            {
              date: now.plus({ month: 7 }).toJSDate(),
              interestPaid: 15.99,
              amount: 2910,
              principlePaid: 2894.01,
              principleRemaining: 1276.52,
            },
            {
              date: now.plus({ month: 8 }).toJSDate(),
              interestPaid: 4.89,
              amount: 1281.41,
              principlePaid: 1276.52,
              principleRemaining: 0,
            },
          ],
        },
        {
          loanName: "foo",
          payments: [
            {
              date: now.plus({ month: 1 }).toJSDate(),
              interestPaid: 18.45,
              amount: 89,
              principlePaid: 70.55,
              principleRemaining: 6253.45,
            },
            {
              date: now.plus({ month: 2 }).toJSDate(),
              interestPaid: 18.24,
              amount: 89,
              principlePaid: 70.76,
              principleRemaining: 6182.69,
            },
            {
              date: now.plus({ month: 3 }).toJSDate(),
              interestPaid: 18.03,
              amount: 89,
              principlePaid: 70.97,
              principleRemaining: 6111.72,
            },
            {
              date: now.plus({ month: 4 }).toJSDate(),
              interestPaid: 17.83,
              amount: 89,
              principlePaid: 71.17,
              principleRemaining: 6040.55,
            },
            {
              date: now.plus({ month: 5 }).toJSDate(),
              interestPaid: 17.62,
              amount: 89,
              principlePaid: 71.38,
              principleRemaining: 5969.17,
            },
            {
              date: now.plus({ month: 6 }).toJSDate(),
              interestPaid: 17.41,
              amount: 89,
              principlePaid: 71.59,
              principleRemaining: 5897.58,
            },
            {
              date: now.plus({ month: 7 }).toJSDate(),
              interestPaid: 17.2,
              amount: 89,
              principlePaid: 71.8,
              principleRemaining: 5825.78,
            },
            {
              date: now.plus({ month: 8 }).toJSDate(),
              interestPaid: 16.99,
              amount: 1717.59,
              principlePaid: 1700.6,
              principleRemaining: 4125.18,
            },
            {
              date: now.plus({ month: 9 }).toJSDate(),
              interestPaid: 12.03,
              amount: 2999,
              principlePaid: 2986.97,
              principleRemaining: 1138.21,
            },
            {
              date: now.plus({ month: 10 }).toJSDate(),
              interestPaid: 3.32,
              amount: 1141.53,
              principlePaid: 1138.21,
              principleRemaining: 0,
            },
          ],
        },
      ];

      expect(
        calculatePayoffSchedule({
          loans,
          monthlyPayment,
          payoffStrategy: PayoffStrategy.Avalanche,
        })
      ).toEqual(expectedLoanPayoff);
    });
  });
});
