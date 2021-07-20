import { Loan } from "../types/Loan";
import currency from "currency.js";

interface LoanWithRemainingPaymentAmount {
  readonly loan: Loan;
  readonly remainingPaymentAmount: number;
}

export const applyPayment = (
  paymentAmount: number,
  loan: Loan
): LoanWithRemainingPaymentAmount => {
  const remainingPaymentAmount = Math.max(
    currency(paymentAmount).subtract(currency(loan.balance).value).value,
    0
  );
  const balance = Math.max(
    currency(loan.balance).subtract(currency(paymentAmount).value).value,
    0
  );

  return {
    remainingPaymentAmount,
    loan: {
      ...loan,
      balance,
    },
  };
};
