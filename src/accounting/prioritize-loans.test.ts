import { PayoffStrategy } from "../types/PayoffStrategy";
import { Loan } from "../types/Loan";
import shuffle from "lodash/shuffle";
import { prioritizeLoans } from "./prioritize-loans";

const bl = { id: 2, name: "mortgage 1", minimumPayment: 900 };
const balance1InterestRate1: Loan = { ...bl, balance: 1, interestRate: 1 };
const balance1InterestRate2: Loan = { ...bl, balance: 1, interestRate: 2 };
const balance1InterestRate3: Loan = { ...bl, balance: 1, interestRate: 3 };
const balance2InterestRate1: Loan = { ...bl, balance: 2, interestRate: 1 };
const balance2InterestRate2: Loan = { ...bl, balance: 2, interestRate: 2 };
const balance2InterestRate3: Loan = { ...bl, balance: 2, interestRate: 3 };
const balance3InterestRate1: Loan = { ...bl, balance: 3, interestRate: 1 };
const balance3InterestRate2: Loan = { ...bl, balance: 3, interestRate: 2 };
const balance3InterestRate3: Loan = { ...bl, balance: 3, interestRate: 3 };

const allLoans = shuffle([
  balance1InterestRate1,
  balance1InterestRate2,
  balance1InterestRate3,
  balance2InterestRate1,
  balance2InterestRate2,
  balance2InterestRate3,
  balance3InterestRate1,
  balance3InterestRate2,
  balance3InterestRate3,
]);

describe("prioritizeLoans", () => {
  describe("when applying the snowball strategy", () => {
    it("orders the loans by lowest balance then by interest rate", () => {
      expect(prioritizeLoans(allLoans, PayoffStrategy.Snowball)).toEqual([
        balance1InterestRate3,
        balance1InterestRate2,
        balance1InterestRate1,
        balance2InterestRate3,
        balance2InterestRate2,
        balance2InterestRate1,
        balance3InterestRate3,
        balance3InterestRate2,
        balance3InterestRate1,
      ]);
    });
  });
  describe("when applying the avalanche strategy", () => {
    it("orders the loans by interest rate then by balance", () => {
      expect(prioritizeLoans(allLoans, PayoffStrategy.Avalanche)).toEqual([
        balance1InterestRate3,
        balance2InterestRate3,
        balance3InterestRate3,
        balance1InterestRate2,
        balance2InterestRate2,
        balance3InterestRate2,
        balance1InterestRate1,
        balance2InterestRate1,
        balance3InterestRate1,
      ]);
    });
  });
});
