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
    <form id={`loan-${id}`}>
      <div className="input-group">
        <label htmlFor={`loan-name-${id}`}>Loan Name</label>
        <input
          name={`loan-name-${id}`}
          type="text"
          placeholder={`loan ${id}`}
          onChange={onChangeHandler(setName)}
          value={name}
        />
      </div>
      <div className="input-group">
        <label htmlFor={`current-balance-${id}`}>Current Balance</label>
        <input
          name={`current-balance-${id}`}
          type="text"
          value={balance}
          placeholder="$0"
          onChange={onChangeHandler(setBalance)}
        />
      </div>
      <div className="input-group">
        <label htmlFor={`minimum-payment-${id}`}>Minimum Payment</label>
        <input
          name={`minimum-payment-${id}`}
          placeholder="$0"
          value={minimumPayment}
          onChange={onChangeHandler(setMinimumPayment)}
        />
      </div>
      <div className="input-group">
        <label htmlFor={`interest-rate-${id}`}>Interest Rate</label>
        <input
          name={`interest-rate-${id}`}
          placeholder="0%"
          value={interestRate}
          onChange={onChangeHandler(setInterestRate)}
        />
      </div>
      <div>
        <button onClick={() => onRemove(id)}>Remove Loan</button>
      </div>
    </form>
  );
};
