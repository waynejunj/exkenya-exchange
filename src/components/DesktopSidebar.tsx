import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Home, Wallet, ArrowLeftRight, Clock, User, LogOut, Shield } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

const navItems = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/wallet', label: 'Wallet', icon: Wallet },
  { to: '/exchange', label: 'Exchange', icon: ArrowLeftRight },
  { to: '/history', label: 'History', icon: Clock },
  { to: '/profile', label: 'Profile', icon: User },
];

export function DesktopSidebar() {
  const location = useLocation();
  const { logout } = useWallet();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-sidebar-foreground">ExKenya</h1>
            <p className="text-xs text-sidebar-foreground/60">Exchange Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.to;
          return (
            <RouterNavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </RouterNavLink>
          );
        })}
      </nav>

      <div className="p-3 mt-auto">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
