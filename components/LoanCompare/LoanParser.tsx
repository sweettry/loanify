import { useState } from 'react';

interface LoanParserProps {
  currentLoanText: string;
  newLoanText: string;
}

const LoanParser: React.FC<LoanParserProps> = ({
  currentLoanText,
  newLoanText,
}) => {
  const [id, setId] = useState(''); // State for the ID

  const parseInputOne = (text: string) => {
    const lines = text.split('\n').map((line) => line.trim());
    const data: Record<string, any> = {};

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
        currentKey = line;
      } else if (currentKey) {
        const parsedValue = line.trim();

        if (currentKey === 'Payments Remaining') {
          const [completed, total] = parsedValue
            .split('of')
            .map((v) => parseInt(v.trim(), 10));
          data[currentKey] = { completed, total };
        } else if (parsedValue.startsWith('$') || parsedValue.endsWith('%')) {
          data[currentKey] = parseFloat(
            parsedValue.replace(/[$,%]/g, '').trim()
          );
        } else if (
          parsedValue.toLowerCase() === 'yes' ||
          parsedValue.toLowerCase() === 'no'
        ) {
          data[currentKey] = parsedValue.toLowerCase() === 'yes';
        } else {
          data[currentKey] = parsedValue;
        }

        currentKey = '';
      }
    });

    return data;
  };

  const parseInputTwo = (text: string) => {
    if (!text) return {}; // Return an empty object if text is empty

    const data: Record<string, string | number | boolean> = {};

    // Step 1: Extract "Lender Name"
    if (text.includes('Lender Name')) {
      const lenderStart = text.indexOf('Lender Name') + 'Lender Name'.length;
      const lenderEnd = text.indexOf('Payoff Amount');
      data['Lender Name'] = text.slice(lenderStart, lenderEnd).trim();
    }

    // Step 2: Extract "Payoff Amount"
    if (text.includes('Payoff Amount')) {
      const payoffStart =
        text.indexOf('Payoff Amount') + 'Payoff Amount'.length;
      const payoffMatch = text.slice(payoffStart).match(/\$([\d,]+\.\d{2})/);
      if (payoffMatch) {
        data['Payoff Amount'] = parseFloat(payoffMatch[1].replace(/,/g, ''));
      }
    }

    // Step 3: Find other fields
    const fields = [
      { key: 'Sales Tax', regex: /\$([\d,]+\.\d{2})/ },
      { key: 'Net Trade In', regex: /\$([\d,]+\.\d{2})/ },
      { key: 'Down Payment', regex: /\$([\d,]+\.\d{2})/ },
      { key: 'GAP', regex: /\$([\d,]+\.\d{2})/ },
      { key: 'VSC', regex: /\$([\d,]+\.\d{2})/ },
      { key: 'Total Fees', regex: /\$([\d,]+\.\d{2})/ },
      { key: 'Cash Back', regex: /\$([\d,]+\.\d{2})/ },
      { key: 'Total Amount Financed', regex: /\$([\d,]+\.\d{2})/ },
      { key: 'Term', regex: /(\d+)\s+months/ },
      { key: 'Interest Rate', regex: /([\d.]+)%/ },
      { key: 'APR', regex: /([\d.]+)%/ },
      { key: 'Payment', regex: /\$([\d,]+\.\d{2})\s*\(Monthly\)/ },
      { key: 'First Payment Date', regex: /(\d{2}-\d{2}-\d{4})/ },
    ];

    fields.forEach((field) => {
      if (text.includes(field.key)) {
        const start = text.indexOf(field.key) + field.key.length;
        const match = text.slice(start).match(field.regex);
        if (match) {
          if (field.key === 'Term') {
            data[field.key] = parseInt(match[1]); // Parse Term as integer
          } else if (field.key === 'First Payment Date') {
            data[field.key] = match[1]; // Keep First Payment Date as a string
          } else {
            data[field.key] = parseFloat(match[1].replace(/,/g, '')); // Parse dollar amounts as float
          }
        }
      }
    });

    return data;
  };

  const currentLoan = parseInputOne(currentLoanText);
  const newLoan = parseInputTwo(newLoanText);

  const handleSaveToFile = async () => {
    const data = { currentLoan, newLoan };

    try {
      const response = await fetch('/api/save-loan-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, data }),
      });

      if (response.ok) {
        alert('Data saved successfully!');
      } else {
        alert('Failed to save data.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data.');
    }
  };

  return (
    <div className='mt-4'>
      <h2 className='mb-2 text-xl font-semibold'>Parsed Data</h2>
      <label className='mb-2 block text-sm font-medium'>ID</label>
      <input
        className='mb-4 w-full rounded border p-2'
        type='text'
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder='Enter an ID to associate with this data'
      />
      <pre className='rounded bg-gray-800 p-4 text-white'>
        {JSON.stringify({ currentLoan, newLoan }, null, 2)}
      </pre>
      <button
        className='mt-2 rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600'
        onClick={handleSaveToFile}
      >
        Save to File
      </button>
    </div>
  );
};

export default LoanParser;
