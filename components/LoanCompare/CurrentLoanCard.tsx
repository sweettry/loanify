const CurrentLoanCard = ({ loanData }) => {
  const { currentLoan, newLoan } = loanData;

  return (
    <div className='rounded-lg bg-white shadow-lg'>
      <div className='p-6'>
        <h2 className='mb-4 text-xl font-semibold text-gray-700'>
          Current Loan
        </h2>
        <ul className='space-y-2 text-gray-600'>
          <li>
            <strong>Lender:</strong> {currentLoan['Current Lender']}
          </li>
          <li>
            <strong>Monthly Payment:</strong> ${currentLoan['Monthly Payment']}
          </li>
          <li>
            <strong>Remaining Balance:</strong> $
            {currentLoan['Remaining Balance']}
          </li>
          <li>
            <strong>Payments Remaining:</strong>{' '}
            {currentLoan['Payments Remaining'].completed}
          </li>
          <li>
            <strong>APR:</strong> {currentLoan['Estimated APR']}%
          </li>
        </ul>
      </div>
    </div>
  );
};
export default CurrentLoanCard;
