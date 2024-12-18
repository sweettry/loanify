import prisma from './db';
import { auth } from '@clerk/nextjs';
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from './types';
import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

function authenticateAndRedirect(): string {
  const { userId } = auth();
  if (!userId) {
    console.error('User is not authenticated.');
    // You might want to throw an error or handle the situation appropriately.
    // For simplicity, let's return an empty string here.
    return '';
  }
  console.log('Authenticated user ID:', userId);
  return userId;
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = authenticateAndRedirect();

  try {
    createAndEditJobSchema.parse(values);
    console.log('Before prisma.job.create');

    const job: JobType = await prisma.job
      .create({
        data: {
          ...values,

          clerkId: userId,
        },
      })
      .catch((prismaError) => {
        console.error('prisma error: ', prismaError);
        throw prismaError;
      });
    return job;
  } catch (error) {
    console.error('Error creating job:', error);
    return null;
  }
}
