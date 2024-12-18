'use client';
import { useState } from 'react';

const LoanComparePage: React.FC = () => {
  const [currentLoanText, setCurrentLoanText] = useState('');
  const [newLoanText, setNewLoanText] = useState('');
  const [parsedData, setParsedData] = useState<any>(null);

  const handleProcess = () => {
    try {
      const parseLoanData = (text: string) => {
        const lines = text.split('\n').map((line) => line.trim());
        const data: Record<string, string | number | boolean> = {};

        const validKeys = [
          'Current Lender',
          'Co-signer',
          'Opening Balance',
          'Remaining Balance',
          'Payments Remaining',
          'Estimated APR',
          'Monthly Payment',
        ];
        let currentKey = '';

        lines.forEach((line) => {
          if (validKeys.includes(line)) {
            // If the line matches a valid key, set it as the current key
            currentKey = line;
          } else if (currentKey) {
            // If the line is a value, process it
            const parsedValue = line.trim();
            if (parsedValue.startsWith('$') || parsedValue.endsWith('%')) {
              // Remove dollar sign or percentage sign and parse as number
              data[currentKey] = parseFloat(
                parsedValue.replace(/[$,%]/g, '').trim()
              );
            } else if (
              parsedValue.toLowerCase() === 'yes' ||
              parsedValue.toLowerCase() === 'no'
            ) {
              // Convert 'Yes'/'No' to boolean
              data[currentKey] = parsedValue.toLowerCase() === 'yes';
            } else {
              // Default to string for any other value
              data[currentKey] = parsedValue;
            }
            currentKey = ''; // Reset currentKey after processing value
          }
        });

        return data;
      };

      const currentLoan = parseLoanData(currentLoanText);
      const newLoan = parseLoanData(newLoanText);

      setParsedData({ currentLoan, newLoan });
    } catch (error) {
      console.error('Error parsing loan data:', error);
      alert('Failed to process the input. Please check the format.');
    }
  };

  return (
    <div>
      <h1 className='text-4xl'>Loan Compare Page</h1>
      <div className='mx-auto max-w-4xl p-4'>
        <h1 className='mb-4 text-2xl font-semibold'>Loan Comparison Input</h1>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='mb-2 block text-sm font-medium'>
              Current Loan Details
            </label>
            <textarea
              className='w-full rounded border p-2'
              rows={10}
              value={currentLoanText}
              onChange={(e) => setCurrentLoanText(e.target.value)}
              placeholder='Paste current loan details here...'
            ></textarea>
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium'>
              New Loan Details
            </label>
            <textarea
              className='w-full rounded border p-2'
              rows={10}
              value={newLoanText}
              onChange={(e) => setNewLoanText(e.target.value)}
              placeholder='Paste new loan details here...'
            ></textarea>
          </div>
        </div>
        <button
          className='mt-4 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600'
          onClick={handleProcess}
        >
          Process Input
        </button>
        {parsedData && (
          <div className='mt-4'>
            <h2 className='mb-2 text-xl font-semibold'>Parsed Data</h2>
            <pre className='rounded bg-gray-800 p-4 text-white'>
              {JSON.stringify(parsedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanComparePage;
