'use client';

import { useEffect, useState } from 'react';
import { toJpeg } from 'html-to-image';

const LoanComparisonPage: React.FC = () => {
  const [loanData, setLoanData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/save-loan-data?id=AP24117807261');
        if (response.ok) {
          const data = await response.json();
          setLoanData(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching loan data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    const element = document.getElementById('exportable-content');
    if (element) {
      toJpeg(element, { quality: 0.95 })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'loan-comparison.jpg';
          link.click();
        })
        .catch((error) => {
          console.error('Error exporting image:', error);
        });
    }
  };

  if (loading) {
    return <div className='text-center text-gray-500'>Loading...</div>;
  }

  if (!loanData) {
    return <div className='text-center text-red-500'>No data available.</div>;
  }

  const { currentLoan, newLoan } = loanData;

  // Calculate benefits
  const monthlyPaymentDifference = Math.abs(
    Math.ceil(currentLoan['Monthly Payment'] - newLoan['Payment'])
  );
  const shorterTerm =
    currentLoan['Payments Remaining'].completed - newLoan['Term'];

  let totalAmountFinanced = 0;
  let totalSavings = Math.ceil(
    currentLoan['Payments Remaining'].completed *
      currentLoan['Monthly Payment'] -
      newLoan['Term'] * newLoan['Payment']
  );

  return (
    <div className='min-h-screen bg-gray-100 px-6 py-10'>
      {/* Add an ID wrapping the entire content */}
      <div
        id='exportable-content'
        className='rounded-lg bg-white p-6 shadow-lg'
      >
        <header className='mb-8 text-center'>
          <h1 className='text-4xl font-bold text-gray-800'>Loan Comparison</h1>
          <p className='mt-2 text-lg text-gray-600'>
            See how the new loan improves your finances.
          </p>
        </header>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Current Loan Card */}
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
                  <strong>Monthly Payment:</strong> $
                  {currentLoan['Monthly Payment']}
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

          {/* New Loan Card */}
          <div className='rounded-lg bg-green-50 shadow-lg'>
            <div className='p-6'>
              <h2 className='mb-4 text-xl font-semibold text-green-700'>
                New Loan
              </h2>
              <ul className='space-y-2 text-green-600'>
                <li>
                  <strong>Lender:</strong> {newLoan['Lender Name']}
                </li>
                <li>
                  <strong>Monthly Payment:</strong> ${newLoan['Payment']}
                </li>
                <li>
                  <strong>Payoff Amount:</strong> ${newLoan['Payoff Amount']}
                </li>
                <li>
                  <strong>Term:</strong> {newLoan['Term']} months
                </li>
                <li>
                  <strong>APR:</strong> {newLoan['APR']}%
                </li>
                <li>
                  <strong>GAP:</strong> ${newLoan['GAP']}
                </li>
                <li>
                  <strong>Total Fees:</strong> ${newLoan['Total Fees']}
                </li>
                <li>
                  <strong>Total Amount Financed:</strong> $
                  {totalAmountFinanced +
                    newLoan['Total Fees'] +
                    newLoan['GAP'] +
                    newLoan['Payoff Amount']}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className='mt-12 rounded-lg bg-blue-100 p-6 shadow-md'>
          <h3 className='mb-4 text-2xl font-semibold text-blue-700'>
            Benefits of the New Loan
          </h3>
          <ul className='my-2 flex-row gap-4 text-blue-600 lg:grid-cols-2'>
            <li className='flex items-center'>
              With only&nbsp;<strong> ${monthlyPaymentDifference}</strong>
              &nbsp;higher payment per month, it will save you
              <strong>&nbsp;${totalSavings} over the life of the loan!</strong>
            </li>
            <li className='mt-4 flex items-center'>
              Reduce loan term by{' '}
              <strong>&nbsp;{shorterTerm}&nbsp;months</strong>
            </li>
          </ul>
        </div>
      </div>

      {/* Export Button */}
      <div className='mt-8 text-center'>
        <button
          onClick={handleExport}
          className='rounded bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700'
        >
          Export as JPG
        </button>
      </div>
    </div>
  );
};

export default LoanComparisonPage;
