"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Expense } from "@/lib/types";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { deleteTransactionAction } from "@/app/actions";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "../ui/badge";

type ExpensesTableProps = {
  data: Expense[];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function ExpensesTable({ data }: ExpensesTableProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteTransactionAction(id);
      toast({
        title: "Success",
        description: "Transaction deleted successfully.",
      });
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Credit</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No expenses yet.
            </TableCell>
          </TableRow>
        )}
        {data.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>{format(expense.date, 'PPP')}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell className="font-medium">{expense.description}</TableCell>
            <TableCell className="capitalize">{expense.paymentMethod}</TableCell>
            <TableCell>
                {expense.isCredit && <Badge variant="destructive">Credit</Badge>}
            </TableCell>
            <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(expense.id)}
                disabled={isPending}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
