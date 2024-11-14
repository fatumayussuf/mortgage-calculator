import { useState } from "react";

export const meta = () => {
  return [
    { title: "Mortgage Calculator" },
    { name: "description", content: "Calculate your mortgage easily!" },
  ];
};

export default function Index() {
  const [amount, setAmount] = useState(null);
  const [interest, setInterest] = useState(null);
  const [years, setYears] = useState(null);
  const [type, setMortgageType] = useState("fixed"); 
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [calculatedValues, setCalculatedValues] = useState(null); // New state for displaying calculation inputs

  const calculateMortgage = (e) => {
    e.preventDefault();

    if (amount <= 0 || interest <= 0 || years <= 0) {
      setMonthlyPayment("Please enter valid values for all fields.");
      return;
    }

    const monthlyInterestRate = interest / 1200;
    const totalPayments = years * 12;
    const payment = amount * monthlyInterestRate / (1 - (1 + monthlyInterestRate) ** -totalPayments);

    setMonthlyPayment(payment.toFixed(2));

    // Store the entered values for display
    setCalculatedValues({
      amount,
      years,
      interest,
      type,
      payment: payment.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen bg-[#133040] flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#133040]">
          Mortgage Calculator
        </h1>
        <form className="space-y-4" onSubmit={calculateMortgage}>
          <Label>
            Mortgage Amount:
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.valueAsNumber)}
            />
          </Label>
          <div className="flex items-center gap-3">
            <Label>
              Mortgage Term (Years):
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.valueAsNumber)}
              />
            </Label>
            <Label>
              Interest Rate %:
              <Input
                type="number"
                value={interest}
                onChange={(e) => setInterest(e.target.valueAsNumber)}
              />
            </Label>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#133040]">Mortgage Type:</p>
            <RadioInput
              name="mortgage-type"
              options={[
                { label: "Repayment", value: "repayment" },
                { label: "Interest only", value: "interest only" },
              ]}
              value={type}
              onChange={(value) => setMortgageType(value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#d9db30] text-[#133040] py-2 px-4 rounded hover:bg-[#bcbf27] transition"
          >
            Calculate Repayments
          </button>
        </form>
      </div>

      {calculatedValues && (
        <div className="bg-white p-6 rounded-lg shadow-md ml-6 max-w-sm text-[#133040]">
          <h2 className="text-xl font-bold mb-4">Calculation Details</h2>
          <p><strong>Mortgage Amount:</strong> KES {calculatedValues.amount}</p>
          <p><strong>Term (Years):</strong> {calculatedValues.years}</p>
          <p><strong>Interest Rate:</strong> {calculatedValues.interest}%</p>
          <p><strong>Mortgage Type:</strong> {calculatedValues.type}</p>
          <p><strong>Monthly Payment:</strong> KES {calculatedValues.payment}</p>
        </div>
      )}
    </div>
  );
}

// Label component
function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-[#133040]">
      {children}
    </label>
  );
}

// Input component
function Input({ type, value, onChange, name, id }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      className="w-full p-2 mt-2 border text-white border-gray-300 rounded focus:outline-none focus:border-[#d9db30]"
    />
  );
}

// Radio input component
function RadioInput({ name, options, value, onChange }) {
  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <input
            type="radio"
            id={option.value}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            name={name}
            className="w-4 h-4 text-[#133040] border border-gray-300 focus:ring-[#d9db30] focus:ring-2"
          />
          <label htmlFor={option.value} className="text-sm text-[#133040]">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
