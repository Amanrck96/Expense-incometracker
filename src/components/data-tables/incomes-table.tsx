"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Income } from "@/lib/types";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteTransactionAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "../ui/badge";

type IncomesTableProps = {
  data: Income[];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function IncomesTable({ data }: IncomesTableProps) {
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
          <TableHead>Source</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Rate</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Credit</TableHead>
          <TableHead className="text-right">Total Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={9} className="text-center">
              No incomes yet.
            </TableCell>
          </TableRow>
        )}
        {data.map((income) => (
          <TableRow key={income.id}>
            <TableCell>{format(income.date, 'PPP')}</TableCell>
            <TableCell>{income.source}</TableCell>
            <TableCell className="font-medium">{income.description}</TableCell>
            <TableCell className="text-right">{income.quantity}</TableCell>
            <TableCell className="text-right">{income.rate ? formatCurrency(income.rate) : ''}</TableCell>
            <TableCell className="capitalize">{income.paymentMethod}</TableCell>
            <TableCell>
                {income.isCredit && <Badge>Credit</Badge>}
            </TableCell>
            <TableCell className="text-right">{formatCurrency(income.amount)}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(income.id)}
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
