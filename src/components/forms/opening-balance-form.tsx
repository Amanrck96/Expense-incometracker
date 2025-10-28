"use client";
import { useActionState } from "react";
import { setOpeningBalanceAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/forms/submit-button";

const initialState = {
    message: '',
    success: false,
};

type OpeningBalanceFormProps = {
    amount: number;
}

export function OpeningBalanceForm({ amount }: OpeningBalanceFormProps) {
    const [state, formAction] = useActionState(setOpeningBalanceAction, initialState);
    const { toast } = useToast();

    if (state.success) {
        toast({
            title: "Success",
            description: state.message,
        });
        state.success = false;
    }
    
    if (state.message && !state.success) {
        toast({
            variant: 'destructive',
            title: "Error",
            description: state.message,
        });
    }

    return (
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="amount">Set Opening Balance</Label>
                <Input id="amount" name="amount" type="number" step="0.01" defaultValue={amount} />
            </div>
            <SubmitButton>Update Balance</SubmitButton>
        </form>
    );
}
