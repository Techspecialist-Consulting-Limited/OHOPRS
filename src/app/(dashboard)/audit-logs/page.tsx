"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  details: Record<string, unknown> | null;
  createdAt: string;
}

export default function AuditLogsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["audit-logs"],
    queryFn: async () => {
      const res = await fetch("/api/audit-logs?limit=200");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const logs: AuditLog[] = data?.logs ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Audit Logs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          System activity log for compliance and monitoring
        </p>
      </div>

      {isLoading ? (
        <p className="py-16 text-center text-muted-foreground">Loading...</p>
      ) : logs.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-16 text-center shadow-sm">
          <p className="text-lg font-medium text-foreground">No audit logs yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Logs will appear here as actions are performed</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left">
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">Time</th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">Action</th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">Entity</th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-border transition-colors hover:bg-muted/30">
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                    {formatDate(log.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-foreground">
                    <span className="font-mono text-xs">{log.entity}</span>
                    {log.entityId && (
                      <span className="ml-1 font-mono text-[10px] text-muted-foreground">
                        #{log.entityId.slice(0, 8)}
                      </span>
                    )}
                  </td>
                  <td className="max-w-xs truncate px-5 py-4 text-xs text-muted-foreground">
                    {log.details ? JSON.stringify(log.details) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
