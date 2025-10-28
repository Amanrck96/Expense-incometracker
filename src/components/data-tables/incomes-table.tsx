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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Rate</TableHead>
          <TableHead className="text-right">Total Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
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
            <TableCell className="text-right">{formatCurrency(income.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
