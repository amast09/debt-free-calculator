import { generateInterest } from "./generate-interest";

const id = 2;
const name = "mortgage 1";
const minimumPayment = 700;

describe("generateInterest", () => {
  it.each`
    balance   | interestRate | expectedNewBalance
    ${1230}   | ${6}         | ${1236.15}
    ${782934} | ${4.5}       | ${785870}
    ${43023}  | ${0.5}       | ${43040.93}
  `(
    "loan balance=`$balance` and interest rate=`$interestRate` new loan balance=`$expectedNewBalance`",
    ({ balance, interestRate, expectedNewBalance }) => {
      expect(
        generateInterest({ id, name, minimumPayment, interestRate, balance })
      ).toEqual({
        id,
        name,
        minimumPayment,
        interestRate,
        balance: expectedNewBalance,
      });
    }
  );
});
