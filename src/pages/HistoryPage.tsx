import { useWallet } from '@/contexts/WalletContext';
import { ArrowDownLeft, ArrowLeftRight, Send } from 'lucide-react';

export default function HistoryPage() {
  const { transactions } = useWallet();

  return (
    <div className="px-4 pt-6 max-w-2xl mx-auto space-y-4 animate-fade-in">
      <h1 className="font-display text-xl font-bold">Transaction History</h1>

      {transactions.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-sm">No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {transactions.map(tx => (
            <div key={tx.id} className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
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
                  <p className="text-[11px] text-muted-foreground">{tx.details}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(tx.date).toLocaleString()}</p>
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
      )}
    </div>
  );
}
