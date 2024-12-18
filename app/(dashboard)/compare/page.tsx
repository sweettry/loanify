'use client';
import { useState } from 'react';
import LoanInput from '@/components/LoanCompare/LoanInput';
import LoanParser from '@/components/LoanCompare/LoanParser';

const LoanComparePage: React.FC = () => {
  const [currentLoanText, setCurrentLoanText] = useState('');
  const [newLoanText, setNewLoanText] = useState('');
  const [parsedData, setParsedData] = useState<any>(null);

  const handleParse = () => {
    setParsedData({ currentLoan: currentLoanText, newLoan: newLoanText });
  };

  return (
    <div>
      <h1 className='text-4xl'>Loan Compare Page</h1>
      <div className='mx-auto max-w-4xl p-4'>
        <h1 className='mb-4 text-2xl font-semibold'>Loan Comparison Input</h1>
        <div className='grid grid-cols-2 gap-4'>
          <LoanInput
            label='Current Loan Details'
            value={currentLoanText}
            onChange={setCurrentLoanText}
          />
          <LoanInput
            label='New Loan Details'
            value={newLoanText}
            onChange={setNewLoanText}
          />
        </div>
        <button
          className='mt-4 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600'
          onClick={handleParse}
        >
          Parse Inputs
        </button>
        {parsedData && (
          <LoanParser
            currentLoanText={parsedData.currentLoan}
            newLoanText={parsedData.newLoan}
          />
        )}
      </div>
    </div>
  );
};

export default LoanComparePage;
