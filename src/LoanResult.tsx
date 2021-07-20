import React from "react";
import { Payment } from "./types/Payment";

interface LoanResultProps {
  readonly payments: Payment[];
}

export const LoanResult: React.FC<LoanResultProps> = (
  props: LoanResultProps
) => (
  <div className="row">
    <div className="col-sm-12">
      <div className="table-responsive">
        <table className="table table-striped text-center">
          <tbody id="tbody-{{id}}">
            <tr>
              <td>Month</td>
              <td>Payment</td>
              <td>Principal Paid</td>
              <td>Interest Paid</td>
              <td>Principal Remaining</td>
            </tr>
            {props.payments.map((payment) => (
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
      </div>
    </div>
  </div>
);
