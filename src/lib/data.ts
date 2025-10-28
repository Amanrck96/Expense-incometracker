import type { Customer, Expense, Income, Item, AnyTransaction, OpeningBalance } from './types';

let openingBalance: OpeningBalance = { amount: 10000 };

let customers: Customer[] = [
  { id: 'CUST001', name: 'John Doe', phone: '123-456-7890', address: '123 Main St', openingBalance: 1000 },
  { id: 'CUST002', name: 'Jane Smith', phone: '098-765-4321', address: '456 Oak Ave', openingBalance: 500 },
];

let items: Item[] = [
  { id: 'ITEM001', name: 'Turmeric', rate: 150, unit: 'kg' },
  { id: 'ITEM002', name: 'Pulse', rate: 120, unit: 'kg' },
  { id: 'ITEM003', name: 'Service A', rate: 5000, unit: 'project' },
];

let expenses: Expense[] = [
  { id: 'EXP001', type: 'expense', date: new Date('2023-10-01'), category: 'Purchase', description: 'Raw materials', amount: 5000, itemId: 'ITEM001', paymentMethod: 'online' },
  { id: 'EXP002', type: 'expense', date: new Date('2023-10-05'), category: 'Rent', description: 'October Rent', amount: 15000, paymentMethod: 'cash' },
  { id: 'EXP003', type: 'expense', date: new Date('2023-10-08'), category: 'Purchase', description: 'Office supplies', amount: 2000, isCredit: true, paymentMethod: 'online' },
];

let incomes: Income[] = [
  { id: 'INC001', type: 'income', date: new Date('2023-10-03'), source: 'Sale', description: 'Invoice #101', amount: 8000, customerId: 'CUST001', paymentMethod: 'online' },
  { id: 'INC002', type: 'income', date: new Date('2023-10-10'), source: 'Service', description: 'Consulting services', amount: 12000, customerId: 'CUST002', paymentMethod: 'cash' },
  { id: 'INC003', type: 'income', date: new Date('2023-10-12'), source: 'Sale', description: 'Invoice #102', amount: 3500, isCredit: true, paymentMethod: 'online' },
];

// Simulate API delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getOpeningBalance(): Promise<OpeningBalance> {
    await delay(50);
    return openingBalance;
}

export async function setOpeningBalance(newBalance: OpeningBalance): Promise<OpeningBalance> {
    await delay(500);
    openingBalance = newBalance;
    return openingBalance;
}

export async function getCustomers(): Promise<Customer[]> {
  await delay(100);
  return customers;
}

export async function getItems(): Promise<Item[]> {
  await delay(100);
  return items;
}

export async function getExpenses(): Promise<Expense[]> {
  await delay(100);
  return expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getIncomes(): Promise<Income[]> {
  await delay(100);
  return incomes.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getRecentTransactions(limit: number = 5): Promise<AnyTransaction[]> {
    const all = [...(await getExpenses()), ...(await getIncomes())];
    return all.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, limit);
}

export async function getStats() {
    const allIncomes = await getIncomes();
    const allExpenses = await getExpenses();
    const { amount: ob } = await getOpeningBalance();
    const totalIncome = allIncomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpense = allExpenses.reduce((sum, e) => sum + e.amount, 0);
    const balance = ob + totalIncome - totalExpense;
    return { openingBalance: ob, totalIncome, totalExpense, balance };
}

export async function addCustomer(customer: Omit<Customer, 'id'>): Promise<Customer> {
    await delay(500);
    const newCustomer = { ...customer, id: `CUST${String(Date.now()).slice(-4)}` };
    customers = [newCustomer, ...customers];
    return newCustomer;
}

export async function addItem(item: Omit<Item, 'id'>): Promise<Item> {
    await delay(500);
    const newItem = { ...item, id: `ITEM${String(Date.now()).slice(-4)}` };
    items = [newItem, ...items];
    return newItem;
}

export async function addExpense(expense: Omit<Expense, 'id' | 'type'>): Promise<Expense> {
    await delay(500);
    const newExpense = { ...expense, type: 'expense' as const, id: `EXP${String(Date.now()).slice(-4)}` };
    expenses = [newExpense, ...expenses];
    return newExpense;
}

export async function addIncome(income: Omit<Income, 'id' | 'type'>): Promise<Income> {
    await delay(500);
    const newIncome = { ...income, type: 'income' as const, id: `INC${String(Date.now()).slice(-4)}` };
    incomes = [newIncome, ...incomes];
    return newIncome;
}

export async function deleteTransaction(id: string): Promise<{ success: boolean }> {
    await delay(500);
    const initialIncomesLength = incomes.length;
    const initialExpensesLength = expenses.length;

    incomes = incomes.filter(i => i.id !== id);
    expenses = expenses.filter(e => e.id !== id);

    const wasDeleted = incomes.length < initialIncomesLength || expenses.length < initialExpensesLength;
    return { success: wasDeleted };
}
