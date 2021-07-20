import { Loan } from "../types/Loan";
import { PayoffStrategy } from "../types/PayoffStrategy";
import orderBy from "lodash/orderBy";

const asc: "asc" = "asc";
const desc: "desc" = "desc";

export const prioritizeLoans = (
  loans: Loan[],
  payoffStrategy: PayoffStrategy
): Loan[] => {
  const sortingFields =
    payoffStrategy === PayoffStrategy.Snowball
      ? ["balance", "interestRate"]
      : ["interestRate", "balance"];
  const sortingOrders =
    payoffStrategy === PayoffStrategy.Snowball ? [asc, desc] : [desc, asc];
  return orderBy(loans, sortingFields, sortingOrders);
};
