import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

const Home = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Button>default</Button>
      <Button variant='outline' size='icon'>
        <Camera />
      </Button>
    </div>
  );
};
export default Home;
