import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Home, Wallet, ArrowLeftRight, Clock, User } from 'lucide-react';

const navItems = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/wallet', label: 'Wallet', icon: Wallet },
  { to: '/exchange', label: 'Exchange', icon: ArrowLeftRight },
  { to: '/history', label: 'History', icon: Clock },
  { to: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(item => {
          const isActive = location.pathname === item.to;
          return (
            <RouterNavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-0.5 px-3 py-1 tap-highlight"
            >
              <item.icon
                className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </RouterNavLink>
          );
        })}
      </div>
    </nav>
  );
}
