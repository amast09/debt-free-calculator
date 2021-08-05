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
    <div className="loan-payoff">
      <div className="loan-payoff__header">
        <h4>{loanPayoff.loanName}</h4>
        <h4>
          paid off by{" "}
          {loanPayoff.payments[
            loanPayoff.payments.length - 1
          ].date.toDateString()}
        </h4>
        <h4>interest paid: ${calculateTotalInterest(loanPayoff.payments)}</h4>
        <div>
          <button
            onClick={() => {
              setPayoffDetailsVisible((v) => !v);
            }}
          >
            {payoffDetailsVisible ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </div>
      {payoffDetailsVisible && (
        <table>
          <tbody id={loanPayoff.loanName}>
            <tr>
              <th>Month</th>
              <th>Payment</th>
              <th>Principal Paid</th>
              <th>Interest Paid</th>
              <th>Principal Remaining</th>
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
