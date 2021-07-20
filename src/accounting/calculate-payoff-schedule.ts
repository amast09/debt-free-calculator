import { PayoffStrategy } from "../types/PayoffStrategy";
import { Loan } from "../types/Loan";
import { DateTime } from "luxon";
import { generateInterest } from "./generate-interest";
import { prioritizeLoans } from "./prioritize-loans";
import { applyPayment } from "./apply-payment";
import groupBy from "lodash/groupBy";
import omit from "lodash/omit";
import currency from "currency.js";

interface Payment {
  readonly date: Date;
  readonly payment: number;
  readonly principlePaid: number;
  readonly interestPaid: number;
  readonly principleRemaining: number;
}

interface PaymentWithId extends Payment {
  readonly loanId: number;
}

export interface LoanPayoff {
  readonly loanName: string;
  readonly payments: Payment[];
}

interface CalculatePayoffScheduleParams {
  readonly loans: Loan[];
  readonly payoffStrategy: PayoffStrategy;
  readonly monthlyPayment: number;
}

export const calculatePayoffSchedule = (
  params: CalculatePayoffScheduleParams
): LoanPayoff[] => {
  const { loans, monthlyPayment, payoffStrategy } = params;

  let currentLoans = prioritizeLoans(loans, payoffStrategy);
  let payments: PaymentWithId[] = [];
  let paymentNumber = 1;
  const now = DateTime.now().startOf("month").startOf("day");

  while (currentLoans.length > 0) {
    let remainingPayment = monthlyPayment;

    const loansAfterMinimumPayment = currentLoans.map((cl) => {
      const loanWithInterest = generateInterest(cl);
      const payDown = applyPayment(cl.minimumPayment, loanWithInterest);
      remainingPayment =
        remainingPayment - (cl.minimumPayment - payDown.remainingPaymentAmount);
      return {
        originalLoan: cl,
        loanWithInterest,
        paidDownLoan: payDown.loan,
      };
    });
    const loansAfterExtraPayments = loansAfterMinimumPayment.map((lwi) => {
      if (remainingPayment > 0) {
        const payDown = applyPayment(remainingPayment, lwi.paidDownLoan);
        remainingPayment = payDown.remainingPaymentAmount;
        return {
          ...lwi,
          paidDownLoan: payDown.loan,
        };
      } else {
        return lwi;
      }
    });
    payments = payments.concat(
      loansAfterExtraPayments.map((loans) => {
        const payment = currency(loans.loanWithInterest.balance).subtract(
          currency(loans.paidDownLoan.balance)
        ).value;
        const interestPaid = currency(loans.loanWithInterest.balance).subtract(
          currency(loans.originalLoan.balance)
        ).value;
        const principlePaid = currency(payment).subtract(interestPaid).value;
        return {
          date: now.plus({ month: paymentNumber }).toJSDate(),
          loanId: loans.originalLoan.id,
          payment,
          principlePaid,
          interestPaid,
          principleRemaining: loans.paidDownLoan.balance,
        };
      })
    );
    currentLoans = loansAfterExtraPayments
      .map((l) => l.paidDownLoan)
      .filter((l) => l.balance > 0);
    paymentNumber = paymentNumber + 1;
  }

  const groupedPayments = groupBy(payments, "loanId");
  return prioritizeLoans(loans, payoffStrategy).map((l) => {
    return {
      loanName: l.name,
      payments: groupedPayments[l.id].map((l) => omit(l, "loanId")),
    };
  });
};
