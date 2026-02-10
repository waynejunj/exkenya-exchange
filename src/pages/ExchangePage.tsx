import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { ArrowLeftRight, CheckCircle, TrendingUp } from 'lucide-react';

type Step = 'form' | 'confirm' | 'success';

const RATE = 130;
const FEE_PERCENT = 0.5;

export default function ExchangePage() {
  const { kesBalance, exchangeKEStoUSD } = useWallet();
  const [step, setStep] = useState<Step>('form');
  const [amount, setAmount] = useState('');

  const kesAmount = Number(amount) || 0;
  const fee = kesAmount * (FEE_PERCENT / 100);
  const usdReceived = (kesAmount - fee) / RATE;

  const handleExchange = () => {
    exchangeKEStoUSD(kesAmount, RATE, fee);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-success-light flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h2 className="font-display text-xl font-bold mb-2">Exchange Successful!</h2>
        <p className="text-muted-foreground text-sm mb-1">KES {kesAmount.toLocaleString()} → ${usdReceived.toFixed(2)} USD</p>
        <button onClick={() => { setStep('form'); setAmount(''); }} className="w-full max-w-xs h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm tap-highlight mt-8">
          Done
        </button>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="px-4 pt-6 max-w-md mx-auto animate-fade-in">
        <h2 className="font-display text-lg font-bold mb-6 text-center">Confirm Exchange</h2>
        <div className="glass-card p-6 space-y-4 mb-6">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">You send</p>
            <p className="financial-amount text-2xl font-bold">KES {kesAmount.toLocaleString()}</p>
          </div>
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">You receive</p>
            <p className="financial-amount text-2xl font-bold text-success">${usdReceived.toFixed(2)}</p>
          </div>
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Rate</span><span className="financial-amount">1 USD = {RATE} KES</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Fee ({FEE_PERCENT}%)</span><span className="financial-amount">KES {fee.toFixed(2)}</span></div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setStep('form')} className="flex-1 h-12 rounded-2xl border border-border font-semibold text-sm tap-highlight">Cancel</button>
          <button onClick={handleExchange} className="flex-1 h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm tap-highlight">Confirm</button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 max-w-md mx-auto space-y-6 animate-fade-in">
      <h1 className="font-display text-xl font-bold">Exchange</h1>

      {/* Rate Card */}
      <div className="glass-card p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Current Rate</p>
          <p className="financial-amount text-sm font-bold">1 USD = {RATE} KES</p>
        </div>
        <span className="ml-auto text-xs text-success font-medium bg-success-light px-2 py-1 rounded-full">Live</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">You Send (KES)</label>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl border border-border bg-card text-2xl font-display font-bold text-center focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
          <p className="text-xs text-muted-foreground text-right">Available: KES {kesBalance.toLocaleString()}</p>
        </div>

        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground mb-1">You Receive (USD)</p>
          <p className="financial-amount text-2xl font-bold text-success">${kesAmount > 0 ? usdReceived.toFixed(2) : '0.00'}</p>
          <p className="text-xs text-muted-foreground mt-1">Fee: KES {fee.toFixed(2)} ({FEE_PERCENT}%)</p>
        </div>

        <button
          onClick={() => setStep('confirm')}
          disabled={kesAmount <= 0 || kesAmount > kesBalance}
          className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm tap-highlight disabled:opacity-40"
        >
          Exchange Now
        </button>
      </div>
    </div>
  );
}
