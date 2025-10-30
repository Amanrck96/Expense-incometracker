"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { updateFinancialMetricsAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Save } from "lucide-react";

type FinancialMetricsFormProps = {
  initialData: {
    openingBalance: number;
    totalIncome: number;
    totalExpense: number;
    balance: number;
    cashInHand: number;
    bankBalance: number;
  };
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export function FinancialMetricsForm({ initialData }: FinancialMetricsFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    openingBalance: initialData.openingBalance,
    cashInHand: initialData.cashInHand,
    bankBalance: initialData.bankBalance,
  });

  // Calculated values (read-only)
  const totalIncome = initialData.totalIncome;
  const totalExpense = initialData.totalExpense;
  const calculatedBalance = formData.openingBalance + totalIncome - totalExpense;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await updateFinancialMetricsAction({
          openingBalance: formData.openingBalance,
          cashInHand: formData.cashInHand,
          bankBalance: formData.bankBalance,
        });
        
        if (result.success) {
          toast({
            title: "Success",
            description: "Financial metrics updated successfully.",
          });
          
          // Force page refresh to update UI
          window.location.reload();
        } else {
          toast({
            title: "Error",
            description: "Failed to update financial metrics.",
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Financial Metrics</CardTitle>
        <CardDescription>
          View and update financial metrics. Some values are calculated automatically based on transactions.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Editable fields */}
            <div className="space-y-2">
              <Label htmlFor="openingBalance">Opening Balance</Label>
              <Input
                id="openingBalance"
                name="openingBalance"
                type="number"
                step="0.01"
                value={formData.openingBalance}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cashInHand">Cash in Hand</Label>
              <Input
                id="cashInHand"
                name="cashInHand"
                type="number"
                step="0.01"
                value={formData.cashInHand}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bankBalance">Bank Balance</Label>
              <Input
                id="bankBalance"
                name="bankBalance"
                type="number"
                step="0.01"
                value={formData.bankBalance}
                onChange={handleChange}
              />
            </div>
            
            {/* Read-only calculated fields */}
            <div className="space-y-2">
              <Label>Total Income (Auto-calculated)</Label>
              <Input
                value={formatCurrency(totalIncome).replace(/[^\d.-]/g, '')}
                disabled
                className="bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Total Expenses (Auto-calculated)</Label>
              <Input
                value={formatCurrency(totalExpense).replace(/[^\d.-]/g, '')}
                disabled
                className="bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Balance (Auto-calculated)</Label>
              <Input
                value={formatCurrency(calculatedBalance).replace(/[^\d.-]/g, '')}
                disabled
                className="bg-muted"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isPending}
            className="flex items-center gap-2"
          >
            {isPending ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}