import { FormLoan } from "./types/Loan";
import { stringIsNumber } from "./string-is-number";
import { PayoffStrategy } from "./types/PayoffStrategy";

interface AppStateToQueryParams {
  readonly monthlyPayment: string;
  readonly loans: FormLoan[];
  readonly payoffStrategy: PayoffStrategy;
}

const loanToQueryParams = (loan: FormLoan): string =>
  `&name_${loan.id}=${loan.name}&balance_${loan.id}=${loan.balance}&minimumPayment_${loan.id}=${loan.minimumPayment}&interestRate_${loan.id}=${loan.interestRate}`;

export const appStateToQueryString = (
  params: AppStateToQueryParams
): string => {
  const { monthlyPayment, loans, payoffStrategy } = params;
  if (stringIsNumber(monthlyPayment) && loans.length > 0) {
    return `?monthlyPayment=${monthlyPayment}&payoffStrategy=${payoffStrategy}${loans
      .map(loanToQueryParams)
      .join("")}`;
  } else {
    return "";
  }
};
