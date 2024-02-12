import CreateJob from '@/components/CreateJob';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

function AddJobPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateJob />
    </HydrationBoundary>
  );
}
export default AddJobPage;
