import React, { ChangeEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./App.css";
import { LoanForm } from "./LoanForm";
import { PayoffStrategy } from "./types/PayoffStrategy";
import { FormLoan } from "./types/Loan";

const App: React.FC = () => {
  const [loans, setLoans] = React.useState<FormLoan[]>([]);
  const [payoffType, setPayoffType] = React.useState<PayoffStrategy>(
    PayoffStrategy.Avalanche
  );
  const [monthlyPayment, setMonthlyPayment] = React.useState<string>("");
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
  const onLoanChange = (loan: FormLoan): void => {
    const newLoans: FormLoan[] = [];
    setLoans(
      loans.reduce((acc, l) => {
        if (l.id === loan.id) {
          return acc.concat(loan);
        }
        return acc.concat(l);
      }, newLoans)
    );
  };
  const onLoanRemove = (loanId: number): void => {
    setLoans(loans.filter((l) => l.id !== loanId));
  };
  const onMonthlyPaymentChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMonthlyPayment(e.target.value);
  };
  const onCalculateClickHandler = (): void => {};

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-sm-offset-3">
            <h1 id="title">
              <a className="title" href="/">
                Debt Free Calculator
              </a>
            </h1>
          </div>
          <div className="col-sm-4">
            <h3>get unburied from debt</h3>
          </div>
          <div className="col-sm-2">
            <a data-toggle="modal" data-target="#helpModal" href="#">
              help
            </a>{" "}
            \
            <a data-toggle="modal" data-target="#aboutModal" href="#">
              about
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <p className="center">
              To view your loans later, simply copy the link in the address bar.
              You can paste it in to your address bar later to view your loans.
            </p>
          </div>
        </div>

        <div id="loan-inputs">
          {loans.map((l) => (
            <LoanForm
              id={l.id}
              onChange={onLoanChange}
              onRemove={onLoanRemove}
            />
          ))}
        </div>

        <div className="row">
          <div className="col-sm-3 col-sm-offset-0">
            <Button
              variant="success"
              id="add-loan"
              onClick={onLoanAddButtonClick}
            >
              + add loan
            </Button>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-2">
            <h4>monthly payment</h4>
            <input
              className="form-control"
              id="monthly-payment"
              placeholder="0"
              value={monthlyPayment}
              onChange={onMonthlyPaymentChange}
            />
          </div>
          <div className="col-sm-4 col-sm-offset-1">
            <h4>
              payment type
              <a
                data-toggle="modal"
                data-target="#paymentTypeHelpModal"
                href="#"
              >
                <span className="question">?</span>
              </a>
            </h4>

            <div className="row">
              <div className="col-sm-6">
                <Button
                  onClick={() => setPayoffType(PayoffStrategy.Avalanche)}
                  variant={
                    payoffType === PayoffStrategy.Avalanche
                      ? "primary"
                      : "outline-primary"
                  }
                >
                  avalanche
                </Button>
              </div>
              <div className="col-sm-6">
                <Button
                  onClick={() => setPayoffType(PayoffStrategy.Snowball)}
                  variant={
                    payoffType === PayoffStrategy.Snowball
                      ? "primary"
                      : "outline-primary"
                  }
                >
                  snowball
                </Button>
              </div>
            </div>
          </div>

          <div className="col-sm-2 col-sm-offset-1">
            <h4>&nbsp;</h4>
            <Button
              variant="outline-secondary"
              onClick={onCalculateClickHandler}
            >
              calculate
            </Button>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <a href="https://aaronmast.dev">aaronmast.dev</a>
          </div>
          <div className="col-sm-3 col-sm-offset-5">
            <a
              href="https://github.com/amast/debt-free-calculator/issues"
              title="Report bugs"
            >
              Report a Bug
            </a>
            \
            <a
              href="https://github.com/amast/debt-free-calculator"
              title="Debt Free Calculator on GitHub"
            >
              GitHub
            </a>
            \
            <a
              href="https://github.com/amast/debt-free-calculator/blob/master/LICENSE"
              title="License"
            >
              MIT License
            </a>
          </div>
        </div>
      </div>

      <div className="modal fade" id="paymentTypeHelpModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <Button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </Button>
              <h4 className="modal-title">Payment Type</h4>
            </div>
            <div className="modal-body">
              <p>
                <strong>Avalanche</strong>: Paying off loans with the
                <strong>highest interest</strong> rate first.
              </p>
              <p>
                <strong>Snowball</strong>: Paying off loans with the
                <strong>lowest balance</strong> first.
              </p>
              <p>
                While <strong>avalanche</strong> results in paying less
                interest, as well as being debt free sooner,{" "}
                <strong>snowball</strong> pays off individual loans faster,
                which can be motivating!
              </p>
              <p>
                Depending on your loans, the outcome may be the same regardless
                of the method used.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="helpModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <Button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </Button>
              <h4 className="modal-title">Help</h4>
            </div>
            <div className="modal-body">
              <p>
                Debt Free Calculator is a loan calculator designed to help you get
                debt-free as fast as possible. Once your loan information is
                entered, you may set the total amount you're able to put towards
                loans in a month. If this amount is greater than the minimum
                you're able to pay on loans, the extra money is put towards one
                loan every month to eliminate it. Once a loan is paid off, the
                money that was previously going towards that loan is now put
                towards the next loan, and so forth.
              </p>

              <p>
                The order of which loans are paid off first is either
                highest-to-lowest interest rate (Avalanche), or
                lowest-to-highest remaining principal (Snowball), depending on
                which you choose.
              </p>

              <p>
                Put just an extra $100 a month towards your loans and see how
                much time and interest paid you save!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="aboutModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <Button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </Button>
              <h4 className="modal-title">About</h4>
            </div>
            <div className="modal-body">
              <p>
                <strong>Debt Free Calculator</strong> is a loan calculator created by
                <a
                  href="https://aaronmast.dev/"
                  target="_new"
                  title="aaronmast.dev"
                >
                  Aaron Mast
                </a>
                .
              </p>

              <p>
                Source code for the project may be obtained at
                <a href="https://github.com/amast/debt-free-calculator">github</a> and is
                licensed under the
                <a href="https://www.opensource.org/licenses/mit-license.php">
                  MIT License
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
