export interface Payment {
    readonly date: Date;
    readonly payment: number;
    readonly principlePaid: number;
    readonly interestPaid: number;
    readonly principleRemaining: number;
}