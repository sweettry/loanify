'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type CardProps = React.ComponentProps<typeof Card>;

export default function LoanComparisonCard({ className, ...props }: CardProps) {
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

  if (loading) {
    return <div className='text-center text-gray-500'>Loading...</div>;
  }

  if (!loanData) {
    return <div className='text-center text-red-500'>No data available.</div>;
  }

  const notifications = [
    {
      title: 'APR',
      description: `${loanData.currentLoan['Estimated APR']}%`,
      downside:
        loanData.currentLoan['Estimated APR'] > 9 ? 'High interest rate' : null,
    },
    {
      title: 'Monthly payment',
      description: `$${loanData.currentLoan['Monthly Payment']}`,
      downside:
        loanData.currentLoan['Monthly Payment'] > 500
          ? 'High monthly payment'
          : null,
    },
    {
      title: 'Remaining Balance',
      description: `$${loanData.currentLoan['Remaining Balance']}`,
      downside:
        loanData.currentLoan['Remaining Balance'] > 30000
          ? 'Expensive repairs'
          : null,
    },
    {
      title: 'Payments remaining',
      description: `${loanData.currentLoan['Payments Remaining'].completed}`,
    },
    {
      title: 'Total payments',
      description: `$${
        loanData.currentLoan['Payments Remaining'].completed *
        loanData.currentLoan['Monthly Payment']
      }`,
    },
  ];

  return (
    <Card
      className={cn(
        'w-[1170px] border-none bg-[url("/assets/logo.svg")] bg-cover opacity-85',
        className
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className='mb-16 text-center text-7xl'>
          Your Current Loan
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div>
          {notifications.map((notification, index) => {
            const numericValue = parseFloat(
              notification.description.replace(/[^0-9.]/g, '')
            );

            return (
              <div
                key={index}
                className='mb-8 grid grid-cols-[25px_2fr_1fr] items-start pb-4 last:mb-0 last:pb-0'
              >
                {/* Indicator */}
                <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />

                {/* Title */}
                <p className='text-left text-5xl font-medium'>
                  {notification.title}
                </p>

                {/* Description */}
                <p className='text-right text-5xl font-semibold text-white'>
                  {notification.description}
                </p>

                {/* Conditionally Render Downside */}
                {/* {numericValue > 0 && (
                  <>
                    {notification.downside ? (
                      <span className='flex h-2 w-2 translate-y-1 rounded-full bg-red-500' />
                    ) : null}
                    <p className='text-left text-2xl font-medium text-white'>
                      {notification.downside}
                    </p>
                  </>
                )} */}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
