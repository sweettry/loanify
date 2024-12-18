import { BellRing, Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const notifications = [
  {
    title: 'APR',
    description: '9.07%',
    downside: 'High inerest rate',
  },
  {
    title: 'Monthly payment',
    description: '$573',
    downside: 'High monthly payment',
  },
  {
    title: 'Remaining Balance',
    description: '$30731',
    downside: 'Expensive repairs',
  },
  {
    title: 'Payments remaining',
    description: '70',
  },
  {
    title: 'Total payments',
    description: '$40,110',
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export default function CardDemo({ className, ...props }: CardProps) {
  return (
    <Card
      className={cn('w-[1000px] border-none bg-violet-700', className)}
      {...props}
    >
      <CardHeader>
        <CardTitle className='text-center text-4xl'>
          Your Current Loan
        </CardTitle>
        {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
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
                className='mb-4 grid grid-cols-[25px_2fr_1fr_25px_2fr] items-start pb-4 last:mb-0 last:pb-0'
              >
                {/* Indicator */}
                <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />

                {/* Title */}
                <p className='text-left text-2xl font-medium'>
                  {notification.title}
                </p>

                {/* Description */}
                <p className='text-muted-foreground text-left text-2xl'>
                  {notification.description}
                </p>

                {/* Conditionally Render Downside */}
                {numericValue > 0 && (
                  <>
                    {notification.downside ? (
                      <span className='flex h-2 w-2 translate-y-1 rounded-full bg-red-500' />
                    ) : null}
                    <p className='text-left text-2xl font-medium text-white'>
                      {notification.downside}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
