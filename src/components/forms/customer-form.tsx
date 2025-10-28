"use client";

import { useState, useActionState } from "react";
import { addCustomerAction } from "@/app/actions";
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
import { PlusCircle } from "lucide-react";
import { SubmitButton } from "@/components/forms/submit-button";

const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

export function AddCustomerForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(
    (prevState, formData: FormData) => addCustomerAction(formData),
    initialState
  );
  const { toast } = useToast();

  if (state.success && open) {
    setOpen(false);
    toast({
        title: "Success",
        description: state.message,
    });
    state.success = false;
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
          Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription>
            Enter the details of the new customer.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" placeholder="Customer name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone / Contact</Label>
              <Input id="phone" name="phone" placeholder="Contact number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">Address</Label>
              <Input id="address" name="address" placeholder="Customer address" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="openingBalance" className="text-right">Opening Balance</Label>
              <Input id="openingBalance" name="openingBalance" type="number" step="0.01" placeholder="0.00" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton>Add Customer</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
