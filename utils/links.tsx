import { AreaChart, Layers, AppWindow } from 'lucide-react';

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: '/add-job',
    label: 'add job',
    icon: <Layers />,
  },
  {
    href: '/jobs',
    label: 'all jobs',
    icon: <AppWindow />,
  },
  {
    href: '/stats',
    label: 'stats',
    icon: <AreaChart />,
  },
  {
    href: '/compare',
    label: 'Loan Compare',
    icon: <AreaChart />,
  },
  {
    href: '/template',
    label: 'Template',
    icon: <AreaChart />,
  },
  {
    href: '/new-template',
    label: 'New Template',
    icon: <AreaChart />,
  },
];

export default links;
