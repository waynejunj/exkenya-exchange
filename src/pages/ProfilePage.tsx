import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Shield, LogOut, ChevronRight, Bell, Lock, HelpCircle } from 'lucide-react';

const settingsItems = [
  { label: 'Security', description: 'Password & 2FA', icon: Lock },
  { label: 'Notifications', description: 'Push & email alerts', icon: Bell },
  { label: 'Help & Support', description: 'FAQ & contact us', icon: HelpCircle },
];

export default function ProfilePage() {
  const { userName, phone, logout } = useWallet();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="px-4 pt-6 max-w-md mx-auto space-y-6 animate-fade-in">
      <h1 className="font-display text-xl font-bold">Profile</h1>

      {/* User Card */}
      <div className="glass-card p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          {userName.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="font-semibold">{userName}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Phone className="w-3 h-3" /> {phone}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <Shield className="w-3 h-3 text-success" />
            <span className="text-[11px] text-success font-medium">Verified</span>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-2">
        {settingsItems.map(item => (
          <button key={item.label} className="w-full glass-card p-4 flex items-center gap-4 tap-highlight">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <item.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full glass-card p-4 flex items-center gap-4 tap-highlight text-destructive"
      >
        <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
          <LogOut className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
}
