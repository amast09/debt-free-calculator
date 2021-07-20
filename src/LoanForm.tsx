import React, { ChangeEvent } from "react";
import { FormLoan } from "./types/Loan";

interface LoanFormProps {
  readonly id: number;
  readonly onChange: (loan: FormLoan) => void;
  readonly onRemove: (loanId: number) => void;
}

const isNumeric = (str: string): boolean => !isNaN(parseFloat(str));

export const LoanForm: React.FC<LoanFormProps> = ({
  onChange,
  id,
  onRemove,
}) => {
  const [name, setName] = React.useState<string>("");
  const [balance, setBalance] = React.useState<string>("");
  const [minimumPayment, setMinimumPayment] = React.useState<string>("");
  const [interestRate, setInterestRate] = React.useState<string>("");

  React.useEffect(() => {
    if (isFormValid()) {
      onChange({ id, name, balance, interestRate, minimumPayment });
    }
  }, [name, balance, minimumPayment, interestRate]);

  const onChangeHandler =
    (handler: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      handler(e.target.value);
    };

  const isFormValid = (): boolean =>
    name.length > 0 &&
    isNumeric(balance) &&
    isNumeric(minimumPayment) &&
    isNumeric(interestRate);

  return (
    <div id={`loan-${id}`} className="loan row">
      <div className="col-sm-3">
        <p>loan name</p>
        <input
          id={`loan-name-${id}`}
          className="form-control"
          name="loan-name"
          type="text"
          placeholder={`loan ${id}`}
          value={name}
          onChange={onChangeHandler(setName)}
        />
      </div>
      <div className="col-sm-3">
        <p>current balance</p>
        <input
          id={`current-balance-${id}`}
          className="form-control"
          name="current-balance"
          placeholder="$0"
          value={balance}
          onChange={onChangeHandler(setBalance)}
        />
      </div>
      <div className="col-sm-3">
        <p>minimum payment</p>
        <input
          id={`minimum-payment-${id}`}
          className="form-control"
          name="minimum-payment"
          placeholder="$0"
          value={minimumPayment}
          onChange={onChangeHandler(setMinimumPayment)}
        />
      </div>
      <div className="col-sm-2">
        <p>interest rate</p>
        <input
          id={`interest-rate-${id}`}
          className="form-control"
          name="interest-rate"
          placeholder="0%"
          value={interestRate}
          onChange={onChangeHandler(setInterestRate)}
        />
      </div>
      <div className="col-sm-1">
        <div onClick={() => onRemove(id)}>X</div>
      </div>
    </div>
  );
};
