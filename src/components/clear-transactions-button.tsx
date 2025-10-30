"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw } from "lucide-react";
import { clearAllTransactionsAction, updateFinancialMetricsAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { AuthModal } from "@/components/auth-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ClearTransactionsButton() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleClearRequest = () => {
    if (isAuthenticated) {
      setShowConfirmDialog(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowConfirmDialog(true);
  };

  const performClear = () => {
    startTransition(async () => {
      try {
        // Clear all transactions
        const result = await clearAllTransactionsAction();
        
        if (result.success) {
          // Recalculate metrics after clearing
          await updateFinancialMetricsAction({});
          
          toast({
            title: "Success",
            description: "All transactions have been cleared and metrics recalculated.",
          });
          
          // Force page refresh to update UI
          window.location.reload();
        } else {
          toast({
            title: "Error",
            description: "Failed to clear transactions.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <>
      <Button 
        variant="destructive" 
        onClick={handleClearRequest}
        disabled={isPending}
        className="flex items-center gap-2"
      >
        {isPending ? (
          <RefreshCw className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        Clear All Transactions
      </Button>

      <AuthModal 
        open={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete all transaction records from the system.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={performClear}>
              {isPending ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Clear All Transactions
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}