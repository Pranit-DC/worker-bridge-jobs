import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Briefcase, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const workerNavItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/worker' },
  { icon: Search, label: 'Browse', href: '/worker/browse' },
  { icon: Briefcase, label: 'My Jobs', href: '/worker/jobs' },
  { icon: User, label: 'Profile', href: '/worker/profile' },
];

const customerNavItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/customer' },
  { icon: Search, label: 'Workers', href: '/customer/workers' },
  { icon: Briefcase, label: 'My Jobs', href: '/customer/jobs' },
  { icon: User, label: 'Profile', href: '/customer/profile' },
];

interface BottomNavigationProps {
  userType: 'worker' | 'customer';
}

export function BottomNavigation({ userType }: BottomNavigationProps) {
  const location = useLocation();
  const navItems = userType === 'worker' ? workerNavItems : customerNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-colors min-w-[64px]",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}