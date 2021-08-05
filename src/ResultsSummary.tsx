import React from "react";

interface ResultsSummaryProps {
  readonly debtFreeDate: Date;
  readonly totalInterestPaid: number;
  readonly loansTotal: number;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  debtFreeDate,
  totalInterestPaid,
  loansTotal,
}) => (
  <div className="results-summary">
    <h4>Total Debt: ${loansTotal}</h4>
    <h4>Total Interest Paid: ${totalInterestPaid}</h4>
    <h4>Debt Free by: {debtFreeDate.toDateString()}</h4>
  </div>
);
