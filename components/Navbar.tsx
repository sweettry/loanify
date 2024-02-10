import LinksDropdown from './LinksDropdown';
import { UserButton } from '@clerk/nextjs';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  return (
    <nav className='bg-muted flex items-center justify-between px-4 py-4 sm:px-16 lg:px-24'>
      <div>
        <LinksDropdown />
      </div>
      <div className='flex items-center gap-x-4'>
        <ThemeToggle />
        <UserButton afterSignOutUrl='/' />
      </div>
    </nav>
  );
}
export default Navbar;
