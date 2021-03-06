import React, { ChangeEvent } from "react";
import "./App.css";
import { LoanForm } from "./LoanForm";
import { PayoffStrategy } from "./types/PayoffStrategy";
import { FormLoan } from "./types/Loan";
import { calculatePayoffSchedule } from "./accounting/calculate-payoff-schedule";
import { LoanPayoff } from "./LoanPayoff";
import { LoanPayoff as LoanPayoffType } from "./types/LoanPayoff";
import isEqual from "lodash/isEqual";
import { PayoffGraph } from "./PayoffGraph";
import { appStateToQueryString } from "./app-state-to-query-string";
import { InitialAppState } from "./types/InitialAppState";
import { ResultsSummary } from "./ResultsSummary";
import { calculateTotalInterestForPayoffs } from "./accounting/calculate-total-interest";
import { calculatePayoffDate } from "./accounting/calculate-payoff-date";
import { formLoanToLoan } from "./form-loan-to-loan";
import currency from "currency.js";

interface AppProps {
  readonly initialState?: InitialAppState;
}

const App: React.FC<AppProps> = ({ initialState }) => {
  const [loans, setLoans] = React.useState<FormLoan[]>(
    initialState?.loans || []
  );
  const [loanPayoffs, setLoanPayoffs] = React.useState<LoanPayoffType[]>(
    initialState
      ? calculatePayoffSchedule({
          loans: initialState.loans.map(formLoanToLoan),
          payoffStrategy: initialState.payoffStrategy,
          monthlyPayment: Number(initialState.monthlyPayment),
        })
      : []
  );
  const [payoffStrategy, setPayoffStrategy] = React.useState<PayoffStrategy>(
    initialState?.payoffStrategy || PayoffStrategy.Avalanche
  );
  const [monthlyPayment, setMonthlyPayment] = React.useState<string>(
    initialState?.monthlyPayment || ""
  );
  const onLoanAddButtonClick = (): void => {
    setLoans(
      loans.concat({
        id: loans.length,
        interestRate: "",
        balance: "",
        name: "",
        minimumPayment: "",
      })
    );
  };
  const onLoanChange = React.useCallback(
    (loan: FormLoan): void => {
      const loanExists = loans.some((l) => isEqual(l, loan));

      if (!loanExists) {
        const newLoans: FormLoan[] = [];
        setLoans(
          loans.reduce((acc, l) => {
            if (l.id === loan.id) {
              return acc.concat(loan);
            }
            return acc.concat(l);
          }, newLoans)
        );
      }
    },
    [loans, setLoans]
  );
  const onLoanRemove = React.useCallback(
    (loanId: number): void => {
      setLoans(loans.filter((l) => l.id !== loanId));
    },
    [loans, setLoans]
  );
  const onMonthlyPaymentChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMonthlyPayment(e.target.value);
  };
  const onCalculateClickHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    setLoanPayoffs(
      calculatePayoffSchedule({
        loans: loans.map(formLoanToLoan),
        payoffStrategy,
        monthlyPayment: Number(monthlyPayment),
      })
    );
    window.history.pushState(
      {},
      "",
      window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        appStateToQueryString({ monthlyPayment, loans, payoffStrategy })
    );
  };

  return (
    <>
      <div className="app">
        <header>
          <h1>Debt Free Calculator</h1>
          <div>
            <a href="/">help</a> / <a href="/">about</a>
          </div>
        </header>
        <p className="sub-header">
          To view your loans later, simply copy the link in the address bar. You
          can paste it in to your address bar later to view your loans.
        </p>

        {loans.map((l) => (
          <LoanForm
            key={l.id}
            id={l.id}
            onChange={onLoanChange}
            onRemove={onLoanRemove}
            initialLoanState={l}
          />
        ))}

        <button className="add-loan-btn" onClick={onLoanAddButtonClick}>
          Add Loan
        </button>

        <form
          className="payoff-strategy-form"
          onSubmit={onCalculateClickHandler}
        >
          <div className="input-group">
            <label htmlFor="monthly-payment">Monthly Payment</label>
            <input
              name="monthly-payment"
              placeholder="0"
              value={monthlyPayment}
              onChange={onMonthlyPaymentChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="payoff-strategy">Payoff Strategy</label>
            <div className="radio-option-group">
              <input
                type="radio"
                name="payoff-strategy"
                id="payoff-strategy-avalanche"
                onChange={() => setPayoffStrategy(PayoffStrategy.Avalanche)}
                checked={payoffStrategy === PayoffStrategy.Avalanche}
              />
              <label htmlFor="payoff-strategy-avalanche">Avalanche</label>
            </div>
            <div className="radio-option-group">
              <input
                type="radio"
                name="payoff-strategy"
                id="payoff-strategy-snowball"
                onChange={() => setPayoffStrategy(PayoffStrategy.Snowball)}
                checked={payoffStrategy === PayoffStrategy.Snowball}
              />
              <label htmlFor="payoff-strategy-snowball">Snowball</label>
            </div>
          </div>
        </form>

        <button className="calculate-btn" onClick={onCalculateClickHandler}>
          Calculate
        </button>

        {loanPayoffs.length > 0 && (
          <>
            <div style={{ width: "100%", height: "500px" }}>
              <PayoffGraph loanPayoffs={loanPayoffs} />
            </div>
            <ResultsSummary
              debtFreeDate={calculatePayoffDate(loanPayoffs)}
              totalInterestPaid={calculateTotalInterestForPayoffs(loanPayoffs)}
              loansTotal={loans.reduce(
                (acc, l) => currency(acc).add(currency(l.balance).value).value,
                0
              )}
            />
          </>
        )}

        {loanPayoffs.map((l) => (
          <LoanPayoff key={l.loanName} loanPayoff={l} />
        ))}

        <footer>
          <a href="https://aaronmast.dev">aaronmast.dev</a>

          <div>
            <a
              href="https://github.com/amast/debt-free-calculator/issues"
              title="Report bugs"
            >
              Report a Bug
            </a>
            /
            <a
              href="https://github.com/amast/debt-free-calculator"
              title="Debt Free Calculator on GitHub"
            >
              GitHub
            </a>
            /
            <a
              href="https://github.com/amast/debt-free-calculator/blob/master/LICENSE"
              title="License"
            >
              MIT License
            </a>
          </div>
        </footer>
      </div>

      {/*<div>*/}
      {/*  <h4>Payment Type</h4>*/}
      {/*  <p>*/}
      {/*    <strong>Avalanche</strong>: Paying off loans with the*/}
      {/*    <strong>highest interest</strong> rate first.*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    <strong>Snowball</strong>: Paying off loans with the*/}
      {/*    <strong>lowest balance</strong> first.*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    While <strong>avalanche</strong> results in paying less interest, as*/}
      {/*    well as being debt free sooner, <strong>snowball</strong> pays off*/}
      {/*    individual loans faster, which can be motivating!*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    Depending on your loans, the outcome may be the same regardless of the*/}
      {/*    method used.*/}
      {/*  </p>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <h4>Help</h4>*/}
      {/*  <p>*/}
      {/*    Debt Free Calculator is a loan calculator designed to help you get*/}
      {/*    debt-free as fast as possible. Once your loan information is entered,*/}
      {/*    you may set the total amount you're able to put towards loans in a*/}
      {/*    month. If this amount is greater than the minimum you're able to pay*/}
      {/*    on loans, the extra money is put towards one loan every month to*/}
      {/*    eliminate it. Once a loan is paid off, the money that was previously*/}
      {/*    going towards that loan is now put towards the next loan, and so*/}
      {/*    forth.*/}
      {/*  </p>*/}

      {/*  <p>*/}
      {/*    The order of which loans are paid off first is either*/}
      {/*    highest-to-lowest interest rate (Avalanche), or lowest-to-highest*/}
      {/*    remaining principal (Snowball), depending on which you choose.*/}
      {/*  </p>*/}

      {/*  <p>*/}
      {/*    Put just an extra $100 a month towards your loans and see how much*/}
      {/*    time and interest paid you save!*/}
      {/*  </p>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <h4>About</h4>*/}
      {/*  <p>*/}
      {/*    <strong>Debt Free Calculator</strong> is a loan calculator created by*/}
      {/*    <a href="https://aaronmast.dev/" target="_new" title="aaronmast.dev">*/}
      {/*      Aaron Mast*/}
      {/*    </a>*/}
      {/*    .*/}
      {/*  </p>*/}

      {/*  <p>*/}
      {/*    Source code for the project may be obtained at*/}
      {/*    <a href="https://github.com/amast/debt-free-calculator">github</a> and*/}
      {/*    is licensed under the*/}
      {/*    <a href="https://www.opensource.org/licenses/mit-license.php">*/}
      {/*      MIT License*/}
      {/*    </a>*/}
      {/*    .*/}
      {/*  </p>*/}
      {/*</div>*/}
    </>
  );
};

export default App;
