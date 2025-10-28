"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Download } from "lucide-react";
import { exportData } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { jsonToCsv, downloadCsv } from "@/lib/utils";

export function AppHeader() {
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      const data = await exportData();

      if (data.customers.length > 0) {
        const csv = jsonToCsv(data.customers);
        downloadCsv(csv, "customers.csv");
      }
      if (data.items.length > 0) {
        const csv = jsonToCsv(data.items);
        downloadCsv(csv, "items.csv");
      }
      if (data.incomes.length > 0) {
        const csv = jsonToCsv(data.incomes);
        downloadCsv(csv, "incomes.csv");
      }
      if (data.expenses.length > 0) {
        const csv = jsonToCsv(data.expenses);
        downloadCsv(csv, "expenses.csv");
      }

      toast({
        title: "Export Successful",
        description: "Your data has been downloaded as CSV files.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Could not export data. Please try again.",
      });
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by customer, item, description..."
          className="w-full bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <Button variant="outline" size="sm" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Export CSV
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
