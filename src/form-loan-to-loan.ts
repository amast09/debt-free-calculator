import { FormLoan, Loan } from "./types/Loan";

export const formLoanToLoan = (loanForm: FormLoan): Loan => ({
  id: loanForm.id,
  name: loanForm.name,
  balance: Number(loanForm.balance),
  interestRate: Number(loanForm.interestRate),
  minimumPayment: Number(loanForm.minimumPayment),
});
