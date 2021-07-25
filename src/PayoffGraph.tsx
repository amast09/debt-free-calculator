import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LoanPayoff } from "./types/LoanPayoff";
import { DateTime } from "luxon";
import groupBy from "lodash/groupBy";
import map from "lodash/map";

const COLORS = Object.freeze([
  "#a0eec0",
  "#de6b48",
  "#2e294e",
  "#666b6a",
  "#e5625e",
  "#d7263d",
  "#8ae9c1",
  "#72a276",
  "#f46036",
  "#86cd82",
]);

interface PayoffGraphProps {
  readonly loanPayoffs: LoanPayoff[];
}

interface LoanOnDate {
  readonly name: string;
  readonly date: string;
  readonly balance: number;
}

export const PayoffGraph: React.FC<PayoffGraphProps> = ({ loanPayoffs }) => {
  const emptyData: LoanOnDate[] = [];
  const flattenedPayments = loanPayoffs.reduce((acc, lp) => {
    return [
      ...acc,
      ...lp.payments.map((p) => ({
        name: lp.loanName,
        date: DateTime.fromJSDate(p.date).toFormat("yyyy LLL dd"),
        balance: p.principleRemaining,
      })),
    ];
  }, emptyData);
  const paymentsByDate = groupBy(flattenedPayments, "date");
  const dataForGraph = map(paymentsByDate, (loansForDay) =>
    loansForDay.reduce(
      (acc, lfd) => ({
        ...acc,
        date: lfd.date,
        [lfd.name]: lfd.balance,
      }),
      {}
    )
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={1000}
        height={500}
        data={dataForGraph}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {loanPayoffs.map((lp, idx) => (
          <Line
            key={lp.loanName}
            type="monotone"
            dataKey={lp.loanName}
            stroke={
              COLORS[((idx % COLORS.length) + COLORS.length) % COLORS.length]
            }
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
