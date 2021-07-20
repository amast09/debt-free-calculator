import React from "react";

interface LoanResultSummaryProps {
  readonly loanName: string;
  readonly payOffDate: Date;
  readonly totalInterestPaid: number;
}

export const LoanResultSummary: React.FC<LoanResultSummaryProps> = (
  props: LoanResultSummaryProps
) => (
  <div className="row text-center" id="loan-head-{{id}}">
    <div className="col-sm-1">
      <a>
        <span
          className="glyphicon glyphicon-chevron-right arrow"
          aria-hidden="true"
        />
      </a>
    </div>
    <div className="col-sm-4">
      <h4>{props.loanName}</h4>
    </div>
    <div className="col-sm-4">
      <h4>paid off by {props.payOffDate.toDateString()}</h4>
    </div>
    <div className="col-sm-3">
      <h4>interest paid: ${props.totalInterestPaid}</h4>
    </div>
  </div>
);
