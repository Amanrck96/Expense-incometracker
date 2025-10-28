
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PropsWithChildren } from "react";

export function CreditsDialog({ children }: PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About: Expense and Income Tracker</DialogTitle>
          <DialogDescription>
            This application helps you manage and understand your finances by
            tracking your daily expenses and sources of income.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
            <p>
                Use the 'Transactions' section to add new income or expense records. The 'Dashboard' provides a quick overview of your financial health.
            </p>
            <p>This application was built with the help of Firebase Studio.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
