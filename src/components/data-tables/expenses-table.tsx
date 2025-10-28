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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No expenses yet.
            </TableCell>
          </TableRow>
        )}
        {data.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>{format(expense.date, 'PPP')}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell className="font-medium">{expense.description}</TableCell>
            <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
