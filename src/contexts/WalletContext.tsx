import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Transaction {
  id: string;
  type: 'deposit' | 'exchange' | 'deriv';
  amount: number;
  currency: 'KES' | 'USD';
  status: 'pending' | 'completed' | 'failed';
  description: string;
  date: string;
  details?: string;
}

interface WalletState {
  kesBalance: number;
  usdBalance: number;
  transactions: Transaction[];
  isAuthenticated: boolean;
  userName: string;
  phone: string;
}

interface WalletContextType extends WalletState {
  depositKES: (amount: number) => void;
  exchangeKEStoUSD: (kesAmount: number, rate: number, fee: number) => void;
  fundDeriv: (amount: number, accountId: string) => void;
  login: (phone: string, password: string) => void;
  logout: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const initialTransactions: Transaction[] = [
  { id: '1', type: 'deposit', amount: 5000, currency: 'KES', status: 'completed', description: 'M-Pesa Deposit', date: '2025-02-09T10:30:00', details: 'Via M-Pesa' },
  { id: '2', type: 'exchange', amount: 38.46, currency: 'USD', status: 'completed', description: 'KES → USD Exchange', date: '2025-02-08T14:20:00', details: '5,000 KES → 38.46 USD' },
  { id: '3', type: 'deriv', amount: 25.00, currency: 'USD', status: 'completed', description: 'Deriv Account Funding', date: '2025-02-07T09:15:00', details: 'Account #DRV12345' },
  { id: '4', type: 'deposit', amount: 10000, currency: 'KES', status: 'pending', description: 'M-Pesa Deposit', date: '2025-02-10T08:00:00', details: 'Via M-Pesa' },
];

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    kesBalance: 15000,
    usdBalance: 63.46,
    transactions: initialTransactions,
    isAuthenticated: false,
    userName: 'John Kamau',
    phone: '+254 712 345 678',
  });

  const addTransaction = (tx: Omit<Transaction, 'id' | 'date'>) => {
    const newTx: Transaction = {
      ...tx,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setState(prev => ({
      ...prev,
      transactions: [newTx, ...prev.transactions],
    }));
  };

  const depositKES = (amount: number) => {
    setState(prev => ({ ...prev, kesBalance: prev.kesBalance + amount }));
    addTransaction({
      type: 'deposit',
      amount,
      currency: 'KES',
      status: 'completed',
      description: 'M-Pesa Deposit',
      details: 'Via M-Pesa',
    });
  };

  const exchangeKEStoUSD = (kesAmount: number, rate: number, fee: number) => {
    const usdReceived = (kesAmount - fee) / rate;
    setState(prev => ({
      ...prev,
      kesBalance: prev.kesBalance - kesAmount,
      usdBalance: prev.usdBalance + usdReceived,
    }));
    addTransaction({
      type: 'exchange',
      amount: usdReceived,
      currency: 'USD',
      status: 'completed',
      description: 'KES → USD Exchange',
      details: `${kesAmount.toLocaleString()} KES → ${usdReceived.toFixed(2)} USD`,
    });
  };

  const fundDeriv = (amount: number, accountId: string) => {
    setState(prev => ({
      ...prev,
      usdBalance: prev.usdBalance - amount,
    }));
    addTransaction({
      type: 'deriv',
      amount,
      currency: 'USD',
      status: 'completed',
      description: 'Deriv Account Funding',
      details: `Account #${accountId}`,
    });
  };

  const login = (phone: string, _password: string) => {
    setState(prev => ({ ...prev, isAuthenticated: true, phone }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, isAuthenticated: false }));
  };

  return (
    <WalletContext.Provider value={{ ...state, depositKES, exchangeKEStoUSD, fundDeriv, login, logout }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}
