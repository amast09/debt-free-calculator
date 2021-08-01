import { LoanPayoff } from "../types/LoanPayoff";

export const calculatePayoffDate = (loanPayoffs: LoanPayoff[]): Date =>
  loanPayoffs.reduce((acc, payoff) => {
    const lastPaymentForNextPayoff = payoff.payments.reduce(
      (acc, payment) => (acc > payment.date ? acc : payment.date),
      new Date()
    );
    return acc > lastPaymentForNextPayoff ? acc : lastPaymentForNextPayoff;
  }, new Date());
