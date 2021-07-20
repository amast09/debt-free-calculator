import { calculateTotalInterest } from "./calculate-total-interest";
import { Payment } from "../types/Payment";

const payments: Payment[] = [
  {
    date: new Date(),
    interestPaid: 18.45,
    payment: 2632,
    principlePaid: 2613.55,
    principleRemaining: 3710.45,
  },
  {
    date: new Date(),
    interestPaid: 10.82,
    payment: 2632,
    principlePaid: 2621.18,
    principleRemaining: 1089.27,
  },
  {
    date: new Date(),
    interestPaid: 3.18,
    payment: 1092.45,
    principlePaid: 1089.27,
    principleRemaining: 0,
  },
];

describe("calculateTotalInterest", () => {
  it("sums up the interest paid over all the payments", () => {
    expect(calculateTotalInterest(payments)).toEqual(32.45);
  });
});
