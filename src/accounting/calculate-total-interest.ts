import { Payment } from "../types/Payment";
import currency from "currency.js";
import { LoanPayoff } from "../types/LoanPayoff";

export const calculateTotalInterest = (payments: Payment[]): number =>
  payments.reduce(
    (acc, p) => currency(acc).add(currency(p.interestPaid)).value,
    0
  );

export const calculateTotalInterestForPayoffs = (
  payoffs: LoanPayoff[]
): number =>
  payoffs.reduce(
    (acc, payoff) =>
      currency(acc).add(calculateTotalInterest(payoff.payments)).value,
    0
  );
