import React from "react";
import { LoanPayoff as LoanPayoffType } from "./types/LoanPayoff";
import { calculateTotalInterest } from "./accounting/calculate-total-interest";

interface LoanPayoffProps {
  readonly loanPayoff: LoanPayoffType;
}

export const LoanPayoff: React.FC<LoanPayoffProps> = ({ loanPayoff }) => {
  const [payoffDetailsVisible, setPayoffDetailsVisible] =
    React.useState<boolean>(false);

  return (
    <div id="loan-head-{{id}}">
      <div
        onClick={() => {
          setPayoffDetailsVisible((v) => !v);
        }}
      >
        {payoffDetailsVisible ? "V" : ">"}
      </div>
      <div>
        <h4>{loanPayoff.loanName}</h4>
      </div>
      <div>
        <h4>
          paid off by{" "}
          {loanPayoff.payments[
            loanPayoff.payments.length - 1
          ].date.toDateString()}
        </h4>
      </div>
      <div>
        <h4>interest paid: ${calculateTotalInterest(loanPayoff.payments)}</h4>
      </div>
      {payoffDetailsVisible && (
        <table>
          <tbody id="tbody-{{id}}">
            <tr>
              <td>Month</td>
              <td>Payment</td>
              <td>Principal Paid</td>
              <td>Interest Paid</td>
              <td>Principal Remaining</td>
            </tr>
            {loanPayoff.payments.map((payment) => (
              <tr>
                <td>{payment.date.toDateString()}</td>
                <td>${payment.amount}</td>
                <td>${payment.principlePaid}</td>
                <td>${payment.interestPaid}</td>
                <td>${payment.principleRemaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
