import { Payment } from "../types/Payment";
import currency from "currency.js";

export const calculateTotalInterest = (payments: Payment[]): number =>
  payments.reduce(
    (acc, p) => currency(acc).add(currency(p.interestPaid)).value,
    0
  );
