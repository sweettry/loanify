import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

import { PropsWithChildren } from 'react';

function layout({ children }: PropsWithChildren) {
  return (
    <main className='grid lg:grid-cols-5'>
      {/* first-col hide on small screen */}
      <div className='hidden lg:col-span-1 lg:block lg:min-h-screen'>
        <Sidebar />
      </div>
      {/* second-col hide dropdown on big screen */}

      <div className='lg:col-span-4'>
        <Navbar />
        <div className='px-4 py-16 sm:px-8 lg:px-16'>{children}</div>
      </div>
    </main>
  );
}
export default layout;
