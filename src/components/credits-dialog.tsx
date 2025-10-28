"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PropsWithChildren } from "react";

export function CreditsDialog({ children }: PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Application Credits</DialogTitle>
          <DialogDescription>
            This application was built with the help of Firebase Studio.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
            <p>
                A special thanks to the developers and designers who contributed to this project.
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
