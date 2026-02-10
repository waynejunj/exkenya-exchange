import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { ArrowDownLeft, ArrowLeftRight, Send, ArrowUpRight, TrendingUp } from 'lucide-react';

const quickActions = [
  { label: 'Deposit KES', icon: ArrowDownLeft, color: 'bg-primary/10 text-primary', to: '/wallet' },
  { label: 'Exchange', icon: ArrowLeftRight, color: 'bg-accent/20 text-accent-foreground', to: '/exchange' },
  { label: 'Fund Deriv', icon: Send, color: 'bg-teal/10 text-teal', to: '/deriv' },
  { label: 'Withdraw', icon: ArrowUpRight, color: 'bg-destructive/10 text-destructive', to: '/wallet' },
];

export default function HomePage() {
  const { kesBalance, usdBalance, userName, transactions } = useWallet();
  const navigate = useNavigate();
  const recentTx = transactions.slice(0, 3);

  return (
    <div className="px-4 pt-6 pb-4 max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="font-display text-xl font-bold">{userName}</h1>
        </div>
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
          {userName.split(' ').map(n => n[0]).join('')}
        </div>
      </div>

      {/* Wallet Card */}
      <div className="gradient-primary rounded-3xl p-5 text-primary-foreground shadow-lg">
        <p className="text-xs opacity-80 mb-1">Total Balance</p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="financial-amount text-3xl font-bold">KES {kesBalance.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-primary-foreground/15 rounded-2xl px-4 py-2.5">
            <p className="text-[10px] uppercase tracking-wider opacity-70">KES</p>
            <p className="financial-amount text-sm font-semibold">{kesBalance.toLocaleString()}</p>
          </div>
          <div className="flex-1 bg-primary-foreground/15 rounded-2xl px-4 py-2.5">
            <p className="text-[10px] uppercase tracking-wider opacity-70">USD</p>
            <p className="financial-amount text-sm font-semibold">${usdBalance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display text-sm font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(action => (
            <button
              key={action.label}
              onClick={() => navigate(action.to)}
              className="flex flex-col items-center gap-2 tap-highlight"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${action.color}`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-foreground leading-tight text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Exchange Rate */}
      <div className="glass-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">KES/USD Rate</p>
            <p className="financial-amount text-sm font-bold">1 USD = 130.00 KES</p>
          </div>
        </div>
        <span className="text-xs text-success font-medium bg-success-light px-2 py-1 rounded-full">Live</span>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-sm font-semibold">Recent Activity</h2>
          <button onClick={() => navigate('/history')} className="text-xs text-primary font-medium">See All</button>
        </div>
        <div className="space-y-2">
          {recentTx.map(tx => (
            <div key={tx.id} className="glass-card p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  tx.type === 'deposit' ? 'bg-success-light text-success' :
                  tx.type === 'exchange' ? 'bg-accent/20 text-accent-foreground' :
                  'bg-primary/10 text-primary'
                }`}>
                  {tx.type === 'deposit' ? <ArrowDownLeft className="w-4 h-4" /> :
                   tx.type === 'exchange' ? <ArrowLeftRight className="w-4 h-4" /> :
                   <Send className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{tx.description}</p>
                  <p className="text-[11px] text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`financial-amount text-sm font-semibold ${tx.type === 'deposit' ? 'text-success' : ''}`}>
                  {tx.type === 'deposit' ? '+' : '-'}{tx.currency === 'KES' ? 'KES ' : '$'}{tx.amount.toLocaleString(undefined, { minimumFractionDigits: tx.currency === 'USD' ? 2 : 0 })}
                </p>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                  tx.status === 'completed' ? 'bg-success-light text-success' :
                  tx.status === 'pending' ? 'bg-accent/20 text-accent-foreground' :
                  'bg-destructive/10 text-destructive'
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
