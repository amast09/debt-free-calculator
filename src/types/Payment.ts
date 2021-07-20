export interface Payment {
    readonly date: Date;
    readonly amount: number;
    readonly principlePaid: number;
    readonly interestPaid: number;
    readonly principleRemaining: number;
}