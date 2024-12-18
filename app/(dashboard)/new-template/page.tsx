'use client';
import CurLoanCard from '@/components/LoanCompare/CurLoanCard';
import NewLoanCard from '@/components/LoanCompare/NewLoanCard';
import CurLoanCardDinamic from '@/components/LoanCompare/CurLoanCardDinamic';

import { toJpeg } from 'html-to-image';
const NewTemplatePage = () => {
  const handleExport = () => {
    const element = document.getElementById('export-content');
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
  return (
    <div>
      Create Layout
      <div
        id='export-content'
        className='grid h-[2532px] w-[1170px] grid-rows-[auto_1fr] bg-gradient-to-r from-violet-500 to-fuchsia-500'
      >
        {/* Header Section */}
        <div className='justify-items-left h-[1000px]  px-16'>
          <div className='mt-24 text-6xl text-white'>Get Your Car</div>
          <div className='mt-6 text-8xl font-semibold text-white'>
            Refinanced
          </div>
          <div className='text-center text-[300px] font-bold tracking-widest text-black'>
            SAVE
          </div>
          <div className='mt-6 text-right text-8xl font-semibold text-white'>
            $2,163.84
          </div>
          <div className='mt-6 text-right text-6xl text-white'>
            In Total Payments <span className='align-super text-2xl'>1</span>
          </div>
        </div>

        {/* Cards Section */}
        <div className='grid h-[1500px] items-start '>
          <CurLoanCardDinamic className='mt-16' />
          {/* <CurLoanCard /> */}
          <NewLoanCard className='-mt-16' />
          {/* <CurLoanCard /> */}
        </div>
      </div>
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
export default NewTemplatePage;
