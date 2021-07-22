import { Payment } from "./Payment";

export interface LoanPayoff {
  readonly loanName: string;
  readonly payments: Payment[];
}
