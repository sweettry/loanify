import Image from 'next/image';
import Logo from '../assets/logo.svg';
import LandingImg from '../assets/main.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function Home() {
  return (
    <main>
      <header className='mx-auto max-w-6xl px-4 py-6 sm:px-8 '>
        <Image src={Logo} alt='logo' />
      </header>
      <section className='mx-auto -mt-20 grid h-screen max-w-6xl items-center px-4 sm:px-8 lg:grid-cols-[1fr,400px]'>
        <div>
          <h1 className='text-4xl font-bold capitalize md:text-7xl'>
            job <span className='text-primary'>tracking</span> app
          </h1>
          <p className='mt-4 max-w-md leading-loose '>
            I am baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Button asChild className='mt-4'>
            <Link href='/add-job'>Get Started</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt='landing' className='hidden lg:block ' />
      </section>
    </main>
  );
}
