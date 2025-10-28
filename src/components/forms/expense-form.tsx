
"use client";

import { useState, useActionState, useRef, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  // New state for credit/payment options
  const [transactionType, setTransactionType] = useState<'cash' | 'credit'>('cash');
  const [paymentMode, setPaymentMode] = useState<'cash' | 'online'>('cash');
  const [creditDetails, setCreditDetails] = useState('');
  const [state, formAction] = useActionState(addExpenseAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && open) {
      setOpen(false);
      setDate(undefined);
      formRef.current?.reset();
      toast({
          title: "Success",
          description: state.message,
      });
      // This is a workaround to reset the state of useActionState
      state.success = false; 
    }
    
    if (state.message && !state.success && state.errors) {
      toast({
        variant: 'destructive',
        title: "Error",
        description: state.message,
      });
    }
  }, [state, open, toast]);
  

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
        <form action={formAction} ref={formRef}>          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <input type="hidden" name="date" value={date?.toISOString() || ''} />
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentMethod" className="text-right">Payment</Label>
              <RadioGroup name="paymentMethod" defaultValue="cash" className="col-span-3 flex gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online">Online</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isCredit" className="text-right">Credit</Label>
                <div className="col-span-3 flex items-center">
                    <Checkbox id="isCredit" name="isCredit" />
                    <Label htmlFor="isCredit" className="ml-2 text-sm font-medium">Is this a credit transaction?</Label>
                </div>
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