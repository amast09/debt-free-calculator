import React from "react";

interface Payment {
  readonly date: Date;
  readonly amount: number;
  readonly principalPaid: number;
  readonly interestPaid: number;
  readonly principleRemaining: number;
}

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
                <td>{payment.date}</td>
                <td>${payment.amount}</td>
                <td>${payment.principalPaid}</td>
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
