'use server';

import { revalidatePath } from 'next/cache';
import * as data from '@/lib/data';
import type { Customer, Expense, Income, Item } from '@/lib/types';
import { z } from 'zod';

const expenseSchema = z.object({
  date: z.coerce.date(),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  itemId: z.string().optional(),
  customerId: z.string().optional(),
});

const incomeSchema = z.object({
  date: z.coerce.date(),
  source: z.string().min(1, "Source is required"),
  description: z.string().min(1, "Description is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  customerId: z.string().optional(),
});

const itemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  rate: z.coerce.number().positive("Rate must be positive"),
  unit: z.string().min(1, "Unit is required"),
});

const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  openingBalance: z.coerce.number().default(0),
});

async function revalidateAll() {
    revalidatePath('/dashboard');
    revalidatePath('/transactions');
    revalidatePath('/manage');
}

export async function addExpenseAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = expenseSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid data provided.', errors: validatedFields.error.flatten().fieldErrors };
  }
  
  await data.addExpense(validatedFields.data as Omit<Expense, 'id' | 'type'>);
  await revalidateAll();
  return { success: true, message: 'Expense added successfully.' };
}

export async function addIncomeAction(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = incomeSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return { success: false, message: 'Invalid data provided.', errors: validatedFields.error.flatten().fieldErrors };
    }

    await data.addIncome(validatedFields.data as Omit<Income, 'id' | 'type'>);
    await revalidateAll();
    return { success: true, message: 'Income added successfully.' };
}

export async function addItemAction(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = itemSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { success: false, message: 'Invalid data provided.', errors: validatedFields.error.flatten().fieldErrors };
    }
    
    await data.addItem(validatedFields.data as Omit<Item, 'id'>);
    await revalidateAll();
    return { success: true, message: 'Item added successfully.' };
}

export async function addCustomerAction(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = customerSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { success: false, message: 'Invalid data provided.', errors: validatedFields.error.flatten().fieldErrors };
    }

    await data.addCustomer(validatedFields.data as Omit<Customer, 'id'>);
    await revalidateAll();
    return { success: true, message: 'Customer added successfully.' };
}

export async function exportData() {
  const expenses = await data.getExpenses();
  const incomes = await data.getIncomes();
  const customers = await data.getCustomers();
  const items = await data.getItems();

  return {
    expenses,
    incomes,
    customers,
    items,
  };
}
