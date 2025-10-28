export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  isCredit?: boolean;
  paymentMethod?: 'cash' | 'online';
  creditDetails?: string;
};

export type Expense = Transaction & {
  type: 'expense';
  category: string;
  itemId?: string;
  customerId?: string;
};

export type Income = Transaction & {
  type: 'income';
  source: string;
  customerId?: string;
  quantity?: number;
  rate?: number;
};

export type AnyTransaction = Expense | Income;

export type Item = {
  id: string;
  name: string;
  rate: number;
  unit: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  openingBalance: number;
};

export type OpeningBalance = {
  amount: number;
};

export type SystemSettings = {
  cashInHand: number;
  bankBalance: number;
  lastUpdated: Date;
};

export type AuditLog = {
  id: string;
  timestamp: Date;
  action: string;
  details: string;
  userId: string;
};
