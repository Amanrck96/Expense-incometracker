"use client";

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/forms/submit-button";
import { deleteExpenseAction, deleteIncomeAction } from "@/app/actions";

type DeleteTransactionButtonProps = {
  id: string;
  type: 'expense' | 'income';
};

export function DeleteTransactionButton({ id, type }: DeleteTransactionButtonProps) {
  const action = type === 'expense' ? deleteExpenseAction : deleteIncomeAction;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this {type}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently remove this entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={action}>
          <input type="hidden" name="id" value={id} />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <SubmitButton variant="destructive" size="sm">Confirm Delete</SubmitButton>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
