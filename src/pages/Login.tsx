import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { Shield, Phone, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const { login } = useWallet();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && !showOtp) {
      setShowOtp(true);
      return;
    }
    login(phone, password);
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <div className="w-full max-w-sm animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">ExKenya</h1>
          <p className="text-sm text-muted-foreground mt-1">Your Kenyan Exchange Platform</p>
        </div>

        {showOtp ? (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h2 className="font-display text-lg font-semibold">Verify Your Phone</h2>
              <p className="text-sm text-muted-foreground mt-1">We sent a code to {phone || '+254 7XX XXX XXX'}</p>
            </div>
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map(i => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={otp[i] || ''}
                  onChange={e => {
                    const val = otp.split('');
                    val[i] = e.target.value;
                    setOtp(val.join(''));
                  }}
                  className="w-14 h-14 rounded-2xl border-2 border-border text-center text-xl font-display font-bold bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm tap-highlight shadow-md"
            >
              Verify & Create Account
            </button>
            <button onClick={() => setShowOtp(false)} className="w-full text-sm text-muted-foreground">
              Back
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="tel"
                  placeholder="+254 7XX XXX XXX"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border bg-card text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-12 pl-11 pr-11 rounded-2xl border border-border bg-card text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs text-primary font-medium">Forgot password?</button>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm tap-highlight shadow-md"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold">
                {isLogin ? 'Register' : 'Sign In'}
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
