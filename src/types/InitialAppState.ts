import {FormLoan} from "./Loan";
import {PayoffStrategy} from "./PayoffStrategy";

export interface InitialAppState {
    readonly monthlyPayment: string;
    readonly loans: FormLoan[];
    readonly payoffStrategy: PayoffStrategy;
}