import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { ArrowDownLeft, CheckCircle, Smartphone } from 'lucide-react';

type Step = 'overview' | 'amount' | 'confirm' | 'success';

export default function WalletPage() {
  const { kesBalance, usdBalance, depositKES } = useWallet();
  const [step, setStep] = useState<Step>('overview');
  const [amount, setAmount] = useState('');

  const presets = [500, 1000, 2500, 5000, 10000];

  const handleDeposit = () => {
    depositKES(Number(amount));
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-success-light flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h2 className="font-display text-xl font-bold mb-2">Deposit Successful!</h2>
        <p className="text-muted-foreground text-sm mb-1">KES {Number(amount).toLocaleString()} added to your wallet</p>
        <p className="text-muted-foreground text-xs mb-8">Via M-Pesa</p>
        <button onClick={() => { setStep('overview'); setAmount(''); }} className="w-full max-w-xs h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm tap-highlight">
          Back to Wallet
        </button>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="px-4 pt-6 max-w-md mx-auto animate-fade-in">
        <h2 className="font-display text-lg font-bold mb-6 text-center">Confirm Deposit</h2>
        <div className="glass-card p-6 space-y-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-success-light flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="font-semibold text-sm">M-Pesa Payment</p>
              <p className="text-xs text-muted-foreground">Safaricom M-Pesa</p>
            </div>
          </div>
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="financial-amount font-semibold">KES {Number(amount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fee</span>
              <span className="financial-amount font-semibold text-success">Free</span>
            </div>
            <div className="flex justify-between text-sm border-t border-border pt-3">
              <span className="font-medium">Total</span>
              <span className="financial-amount font-bold">KES {Number(amount).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground mb-4">You will receive an M-Pesa STK push on your phone</p>
        <div className="flex gap-3">
          <button onClick={() => setStep('amount')} className="flex-1 h-12 rounded-2xl border border-border font-semibold text-sm tap-highlight">
            Cancel
          </button>
          <button onClick={handleDeposit} className="flex-1 h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm tap-highlight">
            Confirm
          </button>
        </div>
      </div>
    );
  }

  if (step === 'amount') {
    return (
      <div className="px-4 pt-6 max-w-md mx-auto animate-fade-in">
        <h2 className="font-display text-lg font-bold mb-6">Deposit KES</h2>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Amount (KES)</label>
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full h-14 px-4 rounded-2xl border border-border bg-card text-2xl font-display font-bold text-center focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {presets.map(p => (
              <button
                key={p}
                onClick={() => setAmount(String(p))}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all tap-highlight ${
                  amount === String(p) ? 'gradient-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {p.toLocaleString()}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep('confirm')}
            disabled={!amount || Number(amount) <= 0}
            className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm tap-highlight disabled:opacity-40"
          >
            Continue
          </button>
          <button onClick={() => setStep('overview')} className="w-full text-sm text-muted-foreground">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
      <h1 className="font-display text-xl font-bold">Wallet</h1>

      <div className="grid gap-4">
        <div className="glass-card p-5">
          <p className="text-xs text-muted-foreground mb-1">KES Balance</p>
          <p className="financial-amount text-2xl font-bold text-foreground">KES {kesBalance.toLocaleString()}</p>
          <div className="h-1 bg-primary/20 rounded-full mt-3">
            <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
          </div>
        </div>
        <div className="glass-card p-5">
          <p className="text-xs text-muted-foreground mb-1">USD Balance</p>
          <p className="financial-amount text-2xl font-bold text-foreground">${usdBalance.toFixed(2)}</p>
          <div className="h-1 bg-accent/30 rounded-full mt-3">
            <div className="h-full bg-accent rounded-full" style={{ width: '35%' }} />
          </div>
        </div>
      </div>

      <button
        onClick={() => setStep('amount')}
        className="w-full glass-card p-4 flex items-center gap-4 tap-highlight"
      >
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <ArrowDownLeft className="w-5 h-5 text-primary" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold">Deposit KES</p>
          <p className="text-xs text-muted-foreground">Via M-Pesa</p>
        </div>
      </button>
    </div>
  );
}
