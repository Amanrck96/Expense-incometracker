import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Item } from "@/lib/types";
import { SubmitButton } from "@/components/forms/submit-button";
import { deleteItemAction } from "@/app/actions";

type ItemsTableProps = {
  data: Item[];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function ItemsTable({ data }: ItemsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item Name</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead className="text-right">Rate</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No items yet.
            </TableCell>
          </TableRow>
        )}
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.unit}</TableCell>
            <TableCell className="text-right">{formatCurrency(item.rate)}</TableCell>
            <TableCell className="text-right">
              <form action={deleteItemAction}>
                <input type="hidden" name="id" value={item.id} />
                <SubmitButton variant="destructive" size="sm">Delete</SubmitButton>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
