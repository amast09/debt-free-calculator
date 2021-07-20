import React from "react";

interface ResultsSummaryProps {
  readonly debtFreeDate: Date;
  readonly totalInterestPaid: number;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = (
  props: ResultsSummaryProps
) => (
  <div className="row text-center">
    <div className="col-sm-4">
      <h4>loan total</h4>
    </div>
    <div className="col-sm-4">
      <h4>debt free by {props.debtFreeDate}</h4>
    </div>
    <div className="col-sm-4">
      <h4>total interest paid: ${props.totalInterestPaid}</h4>
    </div>
  </div>
);
