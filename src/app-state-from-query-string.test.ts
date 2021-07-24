import {
  AppState,
  appStateFromQueryString,
} from "./app-state-from-query-string";
import { PayoffStrategy } from "./types/PayoffStrategy";

describe("appStateFromQueryString", () => {
  it("parses out valid app state into an app state object", () => {
    const queryString =
      "?monthlyPayment=600&payoffStrategy=Snowball&name_0=foo&balance_0=7829&minimumPayment_0=32&interestRate_0=3.2&name_1=bar&balance_1=23390&minimumPayment_1=392&interestRate_1=4.6";
    const expectedAppState: AppState = {
      monthlyPayment: "600",
      loans: [
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
      ],
      payoffStrategy: PayoffStrategy.Snowball,
    };

    expect(appStateFromQueryString(queryString)).toEqual(expectedAppState);
  });

  it("defaults payoff strategy to Avalanche when the payoff strategy is not provided", () => {
    const queryString =
      "?monthlyPayment=600&name_0=foo&balance_0=7829&minimumPayment_0=32&interestRate_0=3.2&name_1=bar&balance_1=23390&minimumPayment_1=392&interestRate_1=4.6";
    const expectedAppState: AppState = {
      monthlyPayment: "600",
      loans: [
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
      ],
      payoffStrategy: PayoffStrategy.Avalanche,
    };

    expect(appStateFromQueryString(queryString)).toEqual(expectedAppState);
  });

  it("defaults payoff strategy to Avalanche when the payoff strategy is invalid", () => {
    const queryString =
      "?monthlyPayment=600&payoffStrategy=INVALID_STRATEGY&name_0=foo&balance_0=7829&minimumPayment_0=32&interestRate_0=3.2&name_1=bar&balance_1=23390&minimumPayment_1=392&interestRate_1=4.6";
    const expectedAppState: AppState = {
      monthlyPayment: "600",
      loans: [
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
      ],
      payoffStrategy: PayoffStrategy.Avalanche,
    };

    expect(appStateFromQueryString(queryString)).toEqual(expectedAppState);
  });

  it("filters out loans that are missing fields", () => {
    const queryString =
      "?monthlyPayment=424&balance_0=7829&minimumPayment_0=32&interestRate_0=3.2&name_1=bar&balance_1=23390&minimumPayment_1=392&interestRate_1=4.6";
    const expectedAppState: AppState = {
      monthlyPayment: "424",
      loans: [
        {
          id: 1,
          name: "bar",
          balance: "23390",
          interestRate: "4.6",
          minimumPayment: "392",
        },
      ],
      payoffStrategy: PayoffStrategy.Avalanche,
    };

    expect(appStateFromQueryString(queryString)).toEqual(expectedAppState);
  });

  it("filters out loans whose balance is not a valid number", () => {
    const queryString =
      "?monthlyPayment=600&name_0=foo&balance_0=INVALID_NUMBER&minimumPayment_0=32&interestRate_0=3.2&name_1=bar&balance_1=23390&minimumPayment_1=392&interestRate_1=4.6&";
    const expectedAppState: AppState = {
      monthlyPayment: "600",
      loans: [
        {
          id: 1,
          name: "bar",
          balance: "23390",
          interestRate: "4.6",
          minimumPayment: "392",
        },
      ],
      payoffStrategy: PayoffStrategy.Avalanche,
    };

    expect(appStateFromQueryString(queryString)).toEqual(expectedAppState);
  });

  it("filters out loans whose minimumPayment is not a valid number", () => {
    const queryString =
      "?monthlyPayment=600&name_0=foo&balance_0=7829&minimumPayment_0=INVALID_NUMBER&interestRate_0=3.2&name_1=bar&balance_1=23390&minimumPayment_1=392&interestRate_1=4.6&";
    const expectedAppState: AppState = {
      monthlyPayment: "600",
      loans: [
        {
          id: 1,
          name: "bar",
          balance: "23390",
          interestRate: "4.6",
          minimumPayment: "392",
        },
      ],
      payoffStrategy: PayoffStrategy.Avalanche,
    };

    expect(appStateFromQueryString(queryString)).toEqual(expectedAppState);
  });

  it("filters out loans whose interestRate is not a valid number", () => {
    const queryString =
      "?monthlyPayment=600&name_0=foo&balance_0=7829&minimumPayment_0=32&interestRate_0=INVALID_NUMBER&name_1=bar&balance_1=23390&minimumPayment_1=392&interestRate_1=4.6&";
    const expectedAppState: AppState = {
      monthlyPayment: "600",
      loans: [
        {
          id: 1,
          name: "bar",
          balance: "23390",
          interestRate: "4.6",
          minimumPayment: "392",
        },
      ],
      payoffStrategy: PayoffStrategy.Avalanche,
    };

    expect(appStateFromQueryString(queryString)).toEqual(expectedAppState);
  });

  it("returns undefined when the query string is empty", () => {
    expect(appStateFromQueryString("")).toEqual(undefined);
  });

  it("returns undefined if the payment amount is not a valid number", () => {
    const queryString =
      "?monthlyPayment=INVALID_NUMBER&name_0=foo&balance_0=7829&minimumPayment_0=32&interestRate_0=3.2&name_1=bar&balance_1=23390&minimumPayment_1=392&interestRate_1=4.6&";

    expect(appStateFromQueryString(queryString)).toEqual(undefined);
  });

  it("returns undefined if the payment amount is less than the minimum payments", () => {
    const queryString =
      "?monthlyPayment=10&name_0=foo&balance_0=7829&minimumPayment_0=32&interestRate_0=3.2&name_1=bar&balance_1=23390&minimumPayment_1=392&interestRate_1=4.6&";

    expect(appStateFromQueryString(queryString)).toEqual(undefined);
  });
});
