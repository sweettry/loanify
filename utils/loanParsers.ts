export const parseInputOne = (text: string) => {
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
      currentKey = line;
    } else if (currentKey) {
      const parsedValue = line.trim();
      if (parsedValue.startsWith('$') || parsedValue.endsWith('%')) {
        data[currentKey] = parseFloat(parsedValue.replace(/[$,%]/g, '').trim());
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

export const parseInputTwo = (text: string) => {
  if (!text) return {}; // Return an empty object if text is empty

  const data: Record<string, string | number | boolean> = {};

  // Extract specific fields as per your logic
  // Example: Lender Name, Payoff Amount, etc.

  return data;
};
