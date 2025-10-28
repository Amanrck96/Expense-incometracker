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
import { useState, useTransition } from "react";
import { deleteTransactionAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { AuthModal } from "@/components/auth-modal";
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

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const handleDelete = (id: string) => {
    if (isAuthenticated) {
      performDelete(id);
    } else {
      setPendingDeleteId(id);
      setShowAuthModal(true);
    }
  };

  const performDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteTransactionAction(id);
      if (result?.success) {
        toast({
          title: "Success",
          description: "Transaction deleted successfully.",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast({
          title: "Not found",
          description: "Transaction not found or already deleted.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="rounded-md border">
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
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onSuccess={() => {
          if (pendingDeleteId) {
            performDelete(pendingDeleteId);
            setPendingDeleteId(null);
          }
        }} 
      />
    </div>
  );
}