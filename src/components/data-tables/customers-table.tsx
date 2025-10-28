import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Customer } from "@/lib/types";
import { SubmitButton } from "@/components/forms/submit-button";
import { deleteCustomerAction } from "@/app/actions";

type CustomersTableProps = {
  data: Customer[];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function CustomersTable({ data }: CustomersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sl. No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead className="text-right">Opening Balance</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No customers yet.
            </TableCell>
          </TableRow>
        )}
        {data.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.id}</TableCell>
            <TableCell className="font-medium">{customer.name}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{customer.address}</TableCell>
            <TableCell className="text-right">{formatCurrency(customer.openingBalance)}</TableCell>
            <TableCell className="text-right">
              <form action={deleteCustomerAction}>
                <input type="hidden" name="id" value={customer.id} />
                <SubmitButton variant="destructive" size="sm">Delete</SubmitButton>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}