"use client";

import { useState, useActionState } from "react";
import { addExpenseAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

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

const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

const expenseCategories = [
    "PAN AND SUPARI",
    "CHICKEN FOR DOGS",
    "VEGETABLE",
    "BIKE PETROL",
    "LABOUR WAGES",
    "FRUIT",
    "SNACKS"
];

export function AddExpenseForm() {
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
              <Select name="category">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input id="description" name="description" placeholder="What was this for?" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Amount (INR)</Label>
              <Input id="amount" name="amount" type="number" step="0.01" placeholder="0.00" className="col-span-3" />
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
