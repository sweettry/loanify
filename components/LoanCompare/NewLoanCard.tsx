'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type CardProps = React.ComponentProps<typeof Card>;

export default function NewLoanCard({ className, ...props }: CardProps) {
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

  const newLoan = loanData.newLoan;

  const notifications = [
    {
      title: 'APR',
      description: `${newLoan['APR']}%`,
      downside: newLoan['APR'] > 6 ? 'Moderate interest rate' : null,
    },
    {
      title: 'Monthly Payment',
      description: `$${newLoan['Payment']}`,
      downside: newLoan['Payment'] > 600 ? 'High monthly payment' : null,
    },
    {
      title: 'New Loan Balance',
      description: `$${newLoan['Payoff Amount']}`,
      downside: newLoan['Payoff Amount'] > 30000 ? 'Manageable balance' : null,
    },
    {
      title: 'Payments Remaining',
      description: `${newLoan['Term']}`,
    },
    {
      title: 'Total Payments',
      description: `$${newLoan['Term'] * newLoan['Payment']}`,
    },
  ];

  return (
    <Card
      className={cn('w-full border-none bg-violet-900 opacity-85', className)}
      {...props}
    >
      <CardHeader>
        <CardTitle className='mb-16 text-center text-7xl'>
          Your New Loan
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
                    <p className='text-left text-2xl font-medium text-gray-800'>
                      {notification.downside}
                    </p>
                  </>
                )} */}
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
