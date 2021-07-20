import currency from "currency.js";
import { Loan } from "../types/Loan";

export const generateInterest = (loan: Loan): Loan => ({
  ...loan,
  balance: currency(loan.balance).add(
    currency(loan.balance).multiply(loan.interestRate / 100 / 12)
  ).value,
});
