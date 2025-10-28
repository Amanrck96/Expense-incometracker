"use client";

import { useState } from "react";
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
import { DatePicker } from "@/components/ui/datepicker";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/forms/submit-button";
import { deleteOldExpensesAction, deleteOldIncomesAction } from "@/app/actions";
import { Trash2 } from "lucide-react";

type BulkDeleteTransactionsProps = {
  type: 'expense' | 'income';
};

export function BulkDeleteTransactions({ type }: BulkDeleteTransactionsProps) {
  const [open, setOpen] = useState(false);
  const [cutoffDate, setCutoffDate] = useState<Date>();
  const action = type === 'expense' ? deleteOldExpensesAction : deleteOldIncomesAction;
  const title = type === 'expense' ? 'Delete Old Expenses' : 'Delete Old Incomes';
  const desc = type === 'expense' ? 'expenses' : 'incomes';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Old {type === 'expense' ? 'Expenses' : 'Incomes'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Choose a cutoff date. All {desc} before this date will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Cutoff Date</Label>
              <input type="hidden" name="cutoffDate" value={cutoffDate?.toISOString()} />
              <DatePicker value={cutoffDate} onChange={setCutoffDate} placeholder="Select date" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton variant="destructive" size="sm">Delete</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
