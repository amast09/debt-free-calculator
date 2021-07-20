export interface FormLoan {
  readonly id: number;
  readonly name: string;
  readonly balance: string;
  readonly minimumPayment: string;
  readonly interestRate: string;
}

export interface Loan {
  readonly id: number;
  readonly name: string;
  readonly balance: number;
  readonly minimumPayment: number;
  readonly interestRate: number;
}
