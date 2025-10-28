"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { addItemAction } from "@/app/actions";
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

export function AddItemForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(addItemAction, initialState);
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
        <Button size="sm" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>
            Enter the details of the new item.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Item Name</Label>
              <Input id="name" name="name" placeholder="Item name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rate" className="text-right">Rate per kg (INR)</Label>
              <Input id="rate" name="rate" type="number" step="0.01" placeholder="0.00" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">Unit</Label>
              <Input id="unit" name="unit" placeholder="kg, bag, etc." className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton>Add Item</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
