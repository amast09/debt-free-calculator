import { FormLoan } from "./types/Loan";
import { StringHash } from "./types/StringHash";
import { isDefined } from "./typeGuards/is-defined";
import { stringIsNumber } from "./string-is-number";
import { PayoffStrategy } from "./types/PayoffStrategy";
import { isPayoffStrategy } from "./typeGuards/is-payoff-strategy";
import { InitialAppState } from "./types/InitialAppState";

interface UnstructuredAppState {
  readonly monthlyPayment?: string;
  readonly payoffStrategy: PayoffStrategy;
  readonly loans: StringHash<StringHash<string>>;
}

const loanFormFromObject = (
  loanObject: StringHash<string>
): FormLoan | undefined => {
  if (
    loanObject["name"] &&
    loanObject["balance"] &&
    stringIsNumber(loanObject["balance"]) &&
    loanObject["minimumPayment"] &&
    stringIsNumber(loanObject["minimumPayment"]) &&
    loanObject["interestRate"] &&
    stringIsNumber(loanObject["interestRate"]) &&
    loanObject["id"]
  ) {
    return {
      id: Number(loanObject["id"]),
      name: loanObject["name"],
      balance: loanObject["balance"],
      minimumPayment: loanObject["minimumPayment"],
      interestRate: loanObject["interestRate"],
    };
  }
};

export const appStateFromQueryString = (
  queryString: string
): InitialAppState | undefined => {
  const urlParams = Array.from(new URLSearchParams(queryString));
  const unstructuredAppState: UnstructuredAppState = urlParams.reduce(
    (acc: UnstructuredAppState, keyValue: [string, string]) => {
      const key = keyValue[0];
      const value = keyValue[1];

      if (
        key === "monthlyPayment" ||
        (key === "payoffStrategy" && isPayoffStrategy(value))
      ) {
        return { ...acc, [key]: value };
      } else {
        const loanPaymentRegex =
          /(name|amount|minimumPayment|interestRate|balance)_(\d+)/;
        const match = key.match(loanPaymentRegex);

        if (match) {
          const loanKey = match[1];
          const loanId = match[2];

          return {
            ...acc,
            loans: {
              ...acc.loans,
              [loanId]: { ...acc.loans[loanId], id: loanId, [loanKey]: value },
            },
          };
        } else {
          return acc;
        }
      }
    },
    {
      monthlyPayment: undefined,
      loans: {},
      payoffStrategy: PayoffStrategy.Avalanche,
    }
  );

  if (unstructuredAppState.monthlyPayment !== undefined) {
    const monthlyPayment = unstructuredAppState.monthlyPayment;
    const loans = Object.values(unstructuredAppState.loans)
      .map(loanFormFromObject)
      .filter(isDefined);
    const minimumPayment = loans.reduce(
      (acc, l) => acc + Number(l.minimumPayment),
      0
    );
    return stringIsNumber(monthlyPayment) &&
      Number(monthlyPayment) > minimumPayment
      ? {
          monthlyPayment,
          loans,
          payoffStrategy: unstructuredAppState.payoffStrategy,
        }
      : undefined;
  } else {
    return undefined;
  }
};
