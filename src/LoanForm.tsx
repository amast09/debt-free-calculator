import React, { ChangeEvent } from "react";
import { FormLoan } from "./types/Loan";

interface LoanFormProps {
  readonly id: number;
  readonly onChange: (loan: FormLoan) => void;
  readonly onRemove: (loanId: number) => void;
  readonly initialLoanState?: FormLoan;
}

const isNumeric = (str: string): boolean => !isNaN(parseFloat(str));

export const LoanForm: React.FC<LoanFormProps> = ({
  onChange,
  id,
  onRemove,
  initialLoanState,
}) => {
  const [name, setName] = React.useState<string>(initialLoanState?.name || "");
  const [balance, setBalance] = React.useState<string>(
    initialLoanState?.balance || ""
  );
  const [minimumPayment, setMinimumPayment] = React.useState<string>(
    initialLoanState?.minimumPayment || ""
  );
  const [interestRate, setInterestRate] = React.useState<string>(
    initialLoanState?.interestRate || ""
  );

  const onChangeHandler =
    (handler: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      handler(e.target.value);
    };

  React.useEffect(() => {
    const isFormValid =
      name.length > 0 &&
      isNumeric(balance) &&
      isNumeric(minimumPayment) &&
      isNumeric(interestRate);

    if (isFormValid) {
      onChange({ id, name, balance, interestRate, minimumPayment });
    }
  }, [id, name, balance, minimumPayment, interestRate, onChange]);

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
