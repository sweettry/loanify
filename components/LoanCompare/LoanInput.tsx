interface LoanInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const LoanInput: React.FC<LoanInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label className='mb-2 block text-sm font-medium'>{label}</label>
      <textarea
        className='w-full rounded border p-2'
        rows={10}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Paste ${label.toLowerCase()} here...`}
      ></textarea>
    </div>
  );
};

export default LoanInput;
