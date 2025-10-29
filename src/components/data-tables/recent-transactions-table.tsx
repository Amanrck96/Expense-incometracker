"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { AnyTransaction } from "@/lib/types";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteTransactionAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { AuthModal } from "@/components/auth-modal";

type RecentTransactionsTableProps = {
  data: AnyTransaction[];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function RecentTransactionsTable({ data }: RecentTransactionsTableProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const [rows, setRows] = useState<AnyTransaction[]>(data);

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
      try {
        const result = await deleteTransactionAction(id);
        if (result?.success) {
          setRows((prev) => prev.filter((t) => t.id !== id));
          toast({
            title: "Success",
            description: "Transaction deleted successfully.",
          });
        } else {
          toast({
            title: "Not found",
            description: "Transaction not found or already deleted.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete transaction. Please try again.",
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
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No transactions yet.
              </TableCell>
            </TableRow>
          )}
          {rows.map((transaction, index) => (
            <TableRow key={transaction.id} className="fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <TableCell className="font-medium">{transaction.description}</TableCell>
              <TableCell>
                <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}
                  className={transaction.type === 'income' ? 'bg-green-700/20 text-green-500' : 'bg-red-700/20 text-red-500'}
                >
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell>{format(transaction.date, 'PPP')}</TableCell>
              <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(transaction.id)}
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