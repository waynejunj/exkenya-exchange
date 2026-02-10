import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Send, CheckCircle } from 'lucide-react';

type Step = 'form' | 'confirm' | 'success';

export default function DerivPage() {
  const { usdBalance, fundDeriv } = useWallet();
  const [step, setStep] = useState<Step>('form');
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');

  const usdAmount = Number(amount) || 0;

  const handleFund = () => {
    fundDeriv(usdAmount, accountId);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-success-light flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h2 className="font-display text-xl font-bold mb-2">Funding Successful!</h2>
        <p className="text-muted-foreground text-sm mb-1">${usdAmount.toFixed(2)} sent to Deriv #{accountId}</p>
        <button onClick={() => { setStep('form'); setAmount(''); setAccountId(''); }} className="w-full max-w-xs h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm tap-highlight mt-8">
          Done
        </button>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="px-4 pt-6 max-w-md mx-auto animate-fade-in">
        <h2 className="font-display text-lg font-bold mb-6 text-center">Confirm Funding</h2>
        <div className="glass-card p-6 space-y-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Send className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">Deriv Account Funding</p>
              <p className="text-xs text-muted-foreground">Account #{accountId}</p>
            </div>
          </div>
          <div className="border-t border-border pt-4 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="financial-amount font-semibold">${usdAmount.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Fee</span><span className="financial-amount font-semibold text-success">Free</span></div>
            <div className="flex justify-between border-t border-border pt-3"><span className="font-medium">Total</span><span className="financial-amount font-bold">${usdAmount.toFixed(2)}</span></div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setStep('form')} className="flex-1 h-12 rounded-2xl border border-border font-semibold text-sm tap-highlight">Cancel</button>
          <button onClick={handleFund} className="flex-1 h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm tap-highlight">Confirm</button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 max-w-md mx-auto space-y-6 animate-fade-in">
      <h1 className="font-display text-xl font-bold">Fund Deriv</h1>

      <div className="glass-card p-4">
        <p className="text-xs text-muted-foreground mb-1">Available USD</p>
        <p className="financial-amount text-xl font-bold">${usdBalance.toFixed(2)}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Deriv Account ID</label>
          <input
            type="text"
            placeholder="e.g. DRV12345"
            value={accountId}
            onChange={e => setAccountId(e.target.value)}
            className="w-full h-12 px-4 rounded-2xl border border-border bg-card text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Amount (USD)</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl border border-border bg-card text-2xl font-display font-bold text-center focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => setStep('confirm')}
          disabled={usdAmount <= 0 || usdAmount > usdBalance || !accountId}
          className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm tap-highlight disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
