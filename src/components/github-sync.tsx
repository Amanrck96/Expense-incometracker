'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { GitBranch } from "lucide-react";

export function GitHubSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  const handleSync = async () => {
    setIsSyncing(true);
    
    // Simulate GitHub synchronization
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Synchronized with GitHub",
      description: "All changes have been successfully pushed to the repository.",
    });
    
    setIsSyncing(false);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleSync} 
      disabled={isSyncing}
    >
      <GitBranch className="mr-2 h-4 w-4" />
      {isSyncing ? "Syncing..." : "Sync with GitHub"}
    </Button>
  );
}