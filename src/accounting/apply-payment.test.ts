import { applyPayment } from "./apply-payment";

const id = 2;
const name = "mortgage 1";
const minimumPayment = 700;
const interestRate = 3.2;

describe("applyPayment", () => {
  it.each`
    balance    | paymentAmount | newBalance  | remainingPaymentAmount
    ${1230}    | ${43}         | ${1187}     | ${0}
    ${782934}  | ${443.5}      | ${782490.5} | ${0}
    ${43023}   | ${33.54}      | ${42989.46} | ${0}
    ${33.54}   | ${43023}      | ${0}        | ${42989.46}
    ${7832.43} | ${10000}      | ${0}        | ${2167.57}
    ${7832.43} | ${7832.43}    | ${0}        | ${0}
  `(
    "updates the loan to a balance of `$newBalance` when the original balance was `$balance` and the payment was `$paymentAmount` returning a remaining payment amount of `$remainingPaymentAmount`",
    ({ balance, paymentAmount, newBalance, remainingPaymentAmount }) => {
      expect(
        applyPayment(paymentAmount, {
          id,
          name,
          minimumPayment,
          interestRate,
          balance,
        })
      ).toEqual({
        remainingPaymentAmount,
        loan: {
          id,
          name,
          minimumPayment,
          interestRate,
          balance: newBalance,
        },
      });
    }
  );
});
