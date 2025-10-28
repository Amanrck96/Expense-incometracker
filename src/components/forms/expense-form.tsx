"use client";

import { useState, useActionState } from "react";
import { addExpenseAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { Customer, Item } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/datepicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { SubmitButton } from "@/components/forms/submit-button";

type AddExpenseFormProps = {
  customers: Customer[];
  items: Item[];
};

const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

export function AddExpenseForm({ customers, items }: AddExpenseFormProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [state, formAction] = useActionState(addExpenseAction, initialState);
  const { toast } = useToast();

  if (state.success && open) {
    setOpen(false);
    toast({
        title: "Success",
        description: state.message,
    });
    state.success = false; // Reset for next time
  }
  
  if (state.message && !state.success && state.errors) {
    toast({
      variant: 'destructive',
      title: "Error",
      description: state.message,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Enter the details of your expense. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <input type="hidden" name="date" value={date?.toISOString()} />
              <DatePicker value={date} onChange={setDate} placeholder="Today" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Input id="category" name="category" placeholder="e.g., Purchase, Rent" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input id="description" name="description" placeholder="What was this for?" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Amount (INR)</Label>
              <Input id="amount" name="amount" type="number" step="0.01" placeholder="0.00" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="itemId" className="text-right">Item</Label>
              <Select name="itemId">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pulse type, Turmeric, etc. (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {items.map(item => (
                    <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerId" className="text-right">Customer</Label>
              <Select name="customerId">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Customer ID or name (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <SubmitButton>Add Expense</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
