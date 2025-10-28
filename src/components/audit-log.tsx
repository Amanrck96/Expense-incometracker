'use client';

import { useState, useEffect } from "react";
import { getAuditLogsAction } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";
import { AuditLog } from "@/lib/types";
import { ClipboardList } from "lucide-react";

export function AuditLogComponent() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      const result = await getAuditLogsAction();
      if (result.success) {
        setLogs(result.data);
      }
      setLoading(false);
    }

    fetchLogs();
    // Refresh logs every 30 seconds
    const interval = setInterval(fetchLogs, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Audit Trail</CardTitle>
        <ClipboardList className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">Loading audit logs...</div>
        ) : logs.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">No audit logs available</div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{log.action}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(new Date(log.timestamp))}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}