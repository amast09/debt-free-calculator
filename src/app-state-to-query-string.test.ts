import { appStateToQueryString } from "./app-state-to-query-string";
import { PayoffStrategy } from "./types/PayoffStrategy";

const loans = [
  {
    id: 0,
    name: "foo",
    balance: "7829",
    interestRate: "3.2",
    minimumPayment: "32",
  },
  {
    id: 1,
    name: "bar",
    balance: "23390",
    interestRate: "4.6",
    minimumPayment: "392",
  },
];

describe("appStateToQueryString", () => {
  it("parses to an empty string when the monthly payment is an empty string", () => {
    expect(
      appStateToQueryString({
        monthlyPayment: "",
        loans,
        payoffStrategy: PayoffStrategy.Avalanche,
      })
    ).toEqual("");
  });

  it("parses to an empty string when the monthly payment is an empty string", () => {
    expect(
      appStateToQueryString({
        monthlyPayment: "INVALID_NUMBER",
        loans,
        payoffStrategy: PayoffStrategy.Avalanche,
      })
    ).toEqual("");
  });

  it("parses to an empty string when the loans are empty", () => {
    expect(
      appStateToQueryString({
        monthlyPayment: "800",
        loans: [],
        payoffStrategy: PayoffStrategy.Avalanche,
      })
    ).toEqual("");
  });

  it("parses to the correct query string when provided with a valid monthly payment and loans with an avalanche strategy", () => {
    expect(
      appStateToQueryString({
        monthlyPayment: "600",
        loans,
        payoffStrategy: PayoffStrategy.Avalanche,
      })
    ).toEqual(
      "?monthlyPayment=600&payoffStrategy=Avalanche&name_0=foo&balance_0=7829&minimumPayment_0=32&interestRate_0=3.2&name_1=bar&balance_1=23390&minimumPayment_1=392&interestRate_1=4.6"
    );
  });

  it("parses to the correct query string when provided with a valid monthly payment and loans with a snowball strategy", () => {
    expect(
        appStateToQueryString({
          monthlyPayment: "600",
          loans,
          payoffStrategy: PayoffStrategy.Snowball,
        })
    ).toEqual(
        "?monthlyPayment=600&payoffStrategy=Snowball&name_0=foo&balance_0=7829&minimumPayment_0=32&interestRate_0=3.2&name_1=bar&balance_1=23390&minimumPayment_1=392&interestRate_1=4.6"
    );
  });
});
